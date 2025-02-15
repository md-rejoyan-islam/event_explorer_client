import Login from "@/components/auth/login";
import { auth } from "@/lib/auth";
import { SessionType } from "@/utils/types";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = (await auth()) as unknown as SessionType;

  const user = session?.user || null;

  if (user) {
    redirect("/dashboard/user");
  }

  return <Login />;
}
