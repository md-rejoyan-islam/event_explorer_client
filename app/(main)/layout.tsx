import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { auth } from "@/lib/auth";
import { SessionType } from "@/utils/types";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as unknown as SessionType;

  return (
    <>
      <Header session={session} />
      <main className="min-h-[calc(100vh-132px)] p-1 md:p-3">{children}</main>
      <Footer />
    </>
  );
}
