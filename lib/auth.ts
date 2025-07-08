import { createLoginToken } from "@/utils/fetch-query";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import mongoClient from "./mongo-client";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: "process.env.AUTH_SECRET",
  adapter: MongoDBAdapter(mongoClient),
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
        },
        password: {},
        name: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) {
          return null;
        }
        return {
          name: credentials.name as string,
          email: credentials.email as string,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        try {
          await createLoginToken(user.email);
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
});
