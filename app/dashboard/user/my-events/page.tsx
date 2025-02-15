"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";

export default function EnrolledEvents() {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin"); // This is a simple check, replace with actual auth logic

  const events = [
    { id: 1, name: "Tech Conference 2023", date: "2023-09-15" },
    { id: 2, name: "Music Festival", date: "2023-10-01" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Enrolled Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {event.date}</p>
              {!isAdmin && (
                <Button variant="destructive" className="mt-4 w-full">
                  Cancel Enrollment
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
