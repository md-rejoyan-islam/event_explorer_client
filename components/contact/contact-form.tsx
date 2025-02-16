import { CREATE_MESSAGE } from "@/queries/message.query";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm({
  user,
}: {
  user: {
    name: string;
    email: string;
    id: string;
  };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      message: "",
    },
  });

  const router = useRouter();
  const pathname = usePathname();

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const onSubmit = (data: FormData) => {
    if (!user) {
      return router.push("/login?next=" + pathname);
    } else {
      try {
        createMessage({
          variables: {
            messageData: {
              message: data.message,
              senderId: user.id,
            },
          },
        })
          .then(() => {
            reset();
            toast.success("Your message has been sent successfully!");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } catch {
        toast.error("Failed to send message");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          id="name"
          type="text"
          disabled={!!user?.name}
          placeholder="Your Name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      {/* Email Field */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          id="email"
          disabled={!!user?.email}
          type="email"
          placeholder="Your Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      {/* Message Field */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          id="message"
          placeholder="Your Message"
          rows={4}
          {...register("message")}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        type="submit"
      >
        <Send className="mr-2" /> Send Message
      </motion.button>
    </form>
  );
}
