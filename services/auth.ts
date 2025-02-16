import { signIn, signOut } from "next-auth/react";

export const loginWithCredentials = async (email: string, password: string) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    await signIn("google", { callbackUrl: "/" });
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

export const loginWithFacebook = async () => {
  try {
    await signIn("facebook", { callbackUrl: "/" });
  } catch (error) {
    console.error("Facebook login error:", error);
    throw error;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut({ callbackUrl: "/" });
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
