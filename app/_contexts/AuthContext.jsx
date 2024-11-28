"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import {
  getMe,
  loginAction,
  signOutAction,
  signupAction,
} from "../_lib/actions";
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
        payload: res.data.user,
      });
      router.push("/menu");
    } else {
      toast.error(res);
    }
  };

  const signup = async (data) => {
    const res = await signupAction(data);

    if (res?.status === "success") {
      dispatch({
        type: "signin",
        payload: res?.data.user,
      });
      router.push("/menu");
    } else {
      return res;
    }
  };

  useEffect(() => {
    (async () => {
      await getMe()
        .then((res) => {
          dispatch({
            type: "loading",
          });

          if (res.status === "success") {
            dispatch({
              type: "signin",
              payload: res.data.user,
            });
          } else {
            dispatch({
              type: "logout",
            });
          }
        })
        .finally(() => {
          dispatch({
            type: "idle",
          });
        });
    })();
  }, []);

  const handleLogout = async () => {
    await signOutAction().then(() => {
      dispatch({
        type: "logout",
      });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        login,
        status,
        logout: handleLogout,
        signup,
      }}
    >
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

export { AuthProvider, useAuth };
