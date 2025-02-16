import Sidebar from "@/components/dashboard/sidebar";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";
import Image from "next/image";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as unknown as SessionType;

  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto max-h-screen">
        <header className="h-[60px] bg-white shadow-sm flex items-center justify-center md:hidden">
          <h1 className="text-xl  sm:text-2xl font-bold flex items-center gap-2">
            <Image
              src="/logo/logo2.png"
              alt="Event Explorer"
              width={40}
              height={40}
              className=""
            />
            Event Dashboard
          </h1>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
