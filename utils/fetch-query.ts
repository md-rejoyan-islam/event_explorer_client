import apolloClient from "@/lib/apollo-client";
import {
  CREATE_LOGIN_TOKEN,
  GET_USER_BY_EMAIL,
  GET_USER_ID_BY_EMAIL,
} from "@/queries/auth.query";
import { GET_ALL_EVENTS_BY_USER_ID } from "@/queries/event.query";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getUserByEmail = async (email: string) => {
  const {
    data: { user },
  } = email
    ? await apolloClient.query({
        query: GET_USER_BY_EMAIL,
        variables: { email },
      })
    : {
        data: {
          user: {},
        },
      };

  return user;
};
export const getUserIdByEmail = async (email: string) => {
  const {
    data: {
      user: { id },
    },
  } = email
    ? await apolloClient.query({
        query: GET_USER_ID_BY_EMAIL,
        variables: { email },
      })
    : {
        data: {
          user: {
            id: "",
          },
        },
      };

  return id;
};

export const getAllEventsByUserId = async (userId: string) => {
  const {
    data: { events = [] },
  } = await apolloClient.query({
    query: GET_ALL_EVENTS_BY_USER_ID({
      query: `title,date,description,id`,
    }),
    variables: { userId },
  });

  return events;
};

export const createLoginToken = async (email: string) => {
  const {
    data: { token },
  } = await apolloClient.mutate({
    mutation: CREATE_LOGIN_TOKEN,
    variables: { email },
  });
  setCookie("token", token, {
    cookies,
    sameSite: "lax",
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
  });
  return token;
};
