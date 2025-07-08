import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateEvent({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the event data based on the ID
  const event = {
    id: params.id,
    name: "Sample Event",
    date: "2023-09-15",
    description: "This is a sample event description.",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Update Event</h1>
      <form className="space-y-4 max-w-xl">
        <div>
          <Label htmlFor="name">Event Name</Label>
          <Input id="name" defaultValue={event.name} />
        </div>
        <div>
          <Label htmlFor="date">Event Date</Label>
          <Input id="date" type="date" defaultValue={event.date} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" defaultValue={event.description} />
        </div>
        <Button type="submit">Update Event</Button>
      </form>
    </div>
  );
}
