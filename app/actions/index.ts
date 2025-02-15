"use server";

import apolloClient from "@/lib/apollo-client";
import { signIn } from "@/lib/auth";
import { USER_LOGIN } from "@/queries/auth.query";
import { LOGIN_TYPE } from "@/utils/types";

import { setCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function login(data: LOGIN_TYPE) {
  try {
    await apolloClient
      .mutate({
        mutation: USER_LOGIN,
        variables: { loginData: data },
      })
      .then(async (res) => {
        const token = res.data?.user?.token;
        setCookie("token", token, { cookies, sameSite: "lax" });

        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
      });

    return {
      status: "success",
      message: "User logged in successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";

    return {
      status: "error",
      message: message,
    };
  }
}
