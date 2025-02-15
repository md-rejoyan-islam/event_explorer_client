import Register from "@/components/auth/register";
import { auth } from "@/lib/auth";
import { SessionType } from "@/utils/types";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = (await auth()) as unknown as SessionType;

  const user = session?.user || null;

  if (user) {
    redirect("/dashboard/user");
  }

  return <Register />;
}
