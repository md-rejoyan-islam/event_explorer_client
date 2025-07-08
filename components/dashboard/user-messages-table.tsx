"use client";
import {
  DELETE_MESSAGE_BY_ID,
  GET_ALL_MESSAGE,
  GET_ALL_MESSAGES_BY_USER_ID,
} from "@/queries/message.query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SmallLoading from "../small-loading";

export default function MessagesTable({ userId }: { userId?: string }) {
  const {
    data: { messages = [] } = {},
    refetch,
    loading,
  } = useQuery(userId ? GET_ALL_MESSAGES_BY_USER_ID : GET_ALL_MESSAGE, {
    variables: {
      userId: userId,
    },
  });

  const [deleteMessage] = useMutation(DELETE_MESSAGE_BY_ID);

  const handleDelete = (id: string) => {
    try {
      deleteMessage({
        variables: { id },
      })
        .then(() => {
          refetch();
          toast.success("Message deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <SmallLoading />;

  return (
    <div className=" mx-auto py-4">
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Message</TableHead>

              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Action </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map(
              (
                item: {
                  message: string;
                  id: string;
                  sender: { name: string; email: string };
                },
                index: number
              ) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b h-11"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.message}</TableCell>

                  <TableCell>{item?.sender?.name}</TableCell>
                  <TableCell>{item?.sender?.email}</TableCell>
                  <TableCell>
                    <button
                      className="bg-red-500 text-white px-3 py-1.5 border text-xs rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </motion.tr>
              )
            )}
            {messages?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
