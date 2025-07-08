import Register from "@/components/auth/register";
import { auth } from "@/lib/auth";
import { SessionType } from "@/utils/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register | Event Explorer",
  description:
    "Register to your account to access all the features of Event Explorer.",
};

export default async function RegisterPage() {
  const session = (await auth()) as unknown as SessionType;

  const user = session?.user || null;

  if (user) {
    redirect("/dashboard/user");
  }

  return <Register />;
}
