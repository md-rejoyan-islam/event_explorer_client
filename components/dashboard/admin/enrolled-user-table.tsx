"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

interface Event {
  createdAt: string;
  user: { email: string; name: string };
  event: { title: string; date: string };
}

export default function EnrolledUserTable({ events }: { events: Event[] }) {
  console.log(events);

  return (
    <div className=" mx-auto py-4">
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b h-11"
              >
                <TableCell>{item.event.title}</TableCell>
                <TableCell>
                  {new Date(item.event?.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.user?.name}</TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell>
                  {new Date(Number.parseInt(item.createdAt)).toLocaleString()}
                </TableCell>
              </motion.tr>
            ))}
            {events?.length === 0 && (
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
