import ContactPage from "@/components/contact/contact-page";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/utils/fetch-query";
import { SessionType } from "@/utils/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Event Explorer",
  description:
    "User can contact the admin for any queries or feedback. It is a great way to get in touch with the admin.",
};

export default async function Contact() {
  const session = (await auth()) as unknown as SessionType;

  const user = await getUserByEmail(session?.user?.email);

  return <ContactPage user={user} />;
}
