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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { ...state, isLoggedIn: true, userData: action.payload };

    case "logout":
      return { ...state, isLoggedIn: false, userData: {} };
  }
};

const AuthProvider = ({ children }) => {
  const [{ isLoggedIn, userData }, dispatch] = useReducer(
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
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login }}>
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
