import ContactPage from "@/components/contact/contact-page";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";

export default async function Contact() {
  const session = (await auth()) as unknown as SessionType;

  const user = await getUserByEmail(session?.user?.email);

  return <ContactPage user={user} />;
}
