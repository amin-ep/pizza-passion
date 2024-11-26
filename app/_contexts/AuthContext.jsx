"use client";

import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getMe, loginAction } from "../_lib/actions";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  userData: {},
  status: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, isLoggedIn: true, userData: action.payload };

    case "logout":
      return { ...state, isLoggedIn: false, userData: {} };

    case "loading":
      return { ...state, status: "loading" };

    case "idle":
      return { ...state, status: "idle" };

    default:
      throw new Error("Unknown action type");
  }
};

const AuthProvider = ({ children }) => {
  const [{ isLoggedIn, userData, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const router = useRouter();

  const login = async (data) => {
    const res = await loginAction(data);
    if (res.status === "success") {
      dispatch({
        type: "signin",
        payload: data,
      });
      router.push("/menu");
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: "loading",
        });
        const userData = await getMe();

        if (userData) {
          dispatch({
            type: "signin",
            payload: userData.data.user,
          });
        } else {
          dispatch({
            type: "logout",
          });
        }
      } catch (err) {
        return err;
      } finally {
        dispatch({
          type: "idle",
        });
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, status }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Context was used outside provider");
  }

  return context;
};

export { useAuth, AuthProvider };
