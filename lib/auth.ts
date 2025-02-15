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
  adapter: MongoDBAdapter(mongoClient),
  // adapter: PrismaAdapter(prisma),
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
    // async jwt({ token, user, account }) {
    //   if (account) {
    //     token.accessToken = account.accessToken;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (token && typeof token.accessToken === "string") {
    //     session.accessToken = token.accessToken;
    //   }
    //   return session;
    // },
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
  //   pages: {
  //     signIn: "/login",
  //     signOut: "/logout",
  //     error: "/error",
  //   },
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user) {
  //         token.id = user.id;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       if (session.user) {
  //         session.user.id = token.id as string;
  //       }
  //       return session;
  //     },
  //   },
});
