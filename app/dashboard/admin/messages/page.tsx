import MessagesTable from "@/components/dashboard/user-messages-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Event Explorer",
  description: "User can view all the messages in the dashboard.",
};

export default async function Messages() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">All Messages</h1>
      <MessagesTable />
    </div>
  );
}
