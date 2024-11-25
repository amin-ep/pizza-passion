import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "../_services/user-api";
import { login, signup } from "../_services/auth-api";
import { cookies } from "next/headers";
import { JWT_EXPIRES } from "../_utils/constants";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingUser = await getUserByEmail({ email: user?.email });

        let password = "";

        if (user.name.trim().length > 12) {
          password = user.name.trim().slice(0, 9);
        } else if (user.name.trim().length < 8) {
          password = user.email.split("@")[0];
        } else {
          password = user.name.trim();
        }

        if (!existingUser) {
          const signupResponse = await signup({
            fullName: user?.name,
            email: user?.email,
            password: password,
          });

          const token = signupResponse?.data?.token;

          cookies().set({
            name: process.env.JWT_SECRET,
            value: token,
            expires: new Date(JWT_EXPIRES),
          });
        } else {
          const loginResponse = await login({
            email: user?.email,
            google: true,
          });

          const token = loginResponse?.data?.token;
          cookies().set({
            name: process.env.JWT_SECRET,
            value: token,
            expires: new Date(JWT_EXPIRES),
          });
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
  pages: {
    signIn: "/access",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
