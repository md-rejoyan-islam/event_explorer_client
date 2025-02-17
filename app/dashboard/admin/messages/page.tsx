import MessagesTable from "@/components/dashboard/user-messages-table";

export default async function Messages() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">All Messages</h1>
      <MessagesTable />
    </div>
  );
}
