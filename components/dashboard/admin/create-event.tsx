"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CREATE_AN_EVENT, UPDATE_EVENT_BY_ID } from "@/queries/event.query";
import { EVENT_TYPE } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Define the Zod validation schema
const eventSchema = z.object({
  title: z
    .string({
      required_error: "Event name is required",
    })
    .min(5, "Event name should be at least 5 characters long"),
  date: z
    .string({
      required_error: "Event date is required",
    })
    .min(10, "Event date should be in the format YYYY-MM-DD"),
  time: z
    .string({
      required_error: "Event time is required",
    })
    .min(5, "Event time should be in the format HH:MM"),
  location: z
    .string({
      required_error: "Event location is required",
    })
    .min(2, "Event location should be at least 2 characters long"),
  category: z
    .string({
      required_error: "Event category is required",
    })
    .min(2, "Event category should be at least 2 characters long"),
  description: z
    .string({
      required_error: "Event description is required",
    })
    .min(10, "Event description should be at least 10 characters long"),
  price: z
    .number({
      required_error: "Event price is required",
    })
    .min(0, "Price should be a positive number"),
  capacity: z
    .number({
      required_error: "Event capacity is required",
    })
    .min(1, "Capacity should be a positive number"),
  authorId: z
    .string({
      required_error: "Author ID is required",
    })
    .optional(),
  additionalInfo: z
    .array(z.string(), {
      required_error: "Additional info is required",
    })
    .min(1, "Additional info should be at least 1 item"),
  status: z.enum(["PUBLISHED", "DRAFT"]).optional().default("DRAFT"),
});

type EventFormValues = z.infer<typeof eventSchema>;

// Component with form
const CreateEventForm = ({
  adminId,
  event,
  type = "create",
  setIsOpen,
}: {
  adminId: string;
  event?: EVENT_TYPE;
  type?: "create" | "update";
  setIsOpen?: (value: boolean) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues:
      type === "update"
        ? { ...event, price: Number(event?.price), status: event?.status }
        : {
            title: "",
            date: "",
            time: "",
            location: "",
            category: "",
            description: "",
            price: 0,
            capacity: 0,
            authorId: adminId,
            additionalInfo: [],
            status: "DRAFT",
          },
  });

  const [createEvent, { loading }] = useMutation(CREATE_AN_EVENT, {
    refetchQueries: [
      "AllEventOutput",
      "GetAllEventsByUserId",
      "allEvents",
      "events",
    ],
  });

  const [updateEvent, { loading: updateLoading }] = useMutation(
    UPDATE_EVENT_BY_ID,
    {
      refetchQueries: ["AllEventOutput", "GetAllEventsByUserId"],
    }
  );

  const onSubmit = async (data: EventFormValues) => {
    if (type === "create") {
      await createEvent({
        variables: {
          eventData: {
            ...data,
            date: new Date(data.date).toISOString(),
            authorId: adminId,
          },
        },
        onCompleted: () => {
          toast.success("Event created successfully");
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      await updateEvent({
        variables: {
          updateData: {
            ...data,
            date: new Date(data.date).toISOString(),
            id: event?.id,
          },
        },
        onCompleted: () => {
          toast.success("Event updated successfully");
          if (setIsOpen) {
            reset();
            setIsOpen(false);
            resetField("status");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Event Title */}
      <div>
        <Label htmlFor="title">Event Name</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} id="title" />}
        />
        {errors?.title && (
          <p className="text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Event Date */}
      <div>
        <Label htmlFor="date">Event Date</Label>
        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, value, ...rest } }) => (
            <Input
              {...rest}
              id="date"
              type="date"
              value={value ? new Date(value).toISOString().split("T")[0] : ""}
              onChange={(e) => {
                const dateValue = e.target.value;
                onChange(dateValue ? new Date(dateValue).toISOString() : "");
              }}
            />
          )}
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>

      {/* Event Time */}
      <div>
        <Label htmlFor="time">Event Time</Label>
        <Controller
          name="time"
          control={control}
          render={({ field }) => <Input {...field} id="time" type="time" />}
        />
        {errors.time && <p className="text-red-500">{errors.time.message}</p>}
      </div>

      {/* Event Location */}
      <div>
        <Label htmlFor="location">Location</Label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => <Input {...field} id="location" />}
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>

      {/* Event Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => <Input {...field} id="category" />}
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Event Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea {...field} id="description" rows={5} />
          )}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Event Price */}
      <div>
        <Label htmlFor="price">Price</Label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="price"
              type="number"
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
            />
          )}
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      {/* Event Capacity */}
      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Controller
          name="capacity"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="capacity"
              type="number"
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          )}
        />
        {errors.capacity && (
          <p className="text-red-500">{errors.capacity.message}</p>
        )}
      </div>

      {/* Additional Information */}
      <div>
        <Label htmlFor="additionalInfo">Additional Info</Label>
        <Controller
          name="additionalInfo"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="additionalInfo"
              onChange={(e) => field.onChange(e.target.value.split(","))}
              placeholder="Separate each info with a comma"
            />
          )}
        />
        {errors.additionalInfo && (
          <p className="text-red-500">{errors.additionalInfo.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id="status"
              className="w-full py-2 px-3 border border-gray-300 rounded-md"
            >
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
            </select>
          )}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-3">
        <Button
          type="submit"
          className="w-full"
          disabled={loading || updateLoading}
        >
          {type === "create" ? "Create Event" : "Update Event"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEventForm;
