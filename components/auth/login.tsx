"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { login } from "@/app/actions";
import ProviderLogin from "@/components/auth/provider-login";
import { fadeIn, slideIn } from "@/utils/animations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  isAdmin: z.boolean(),
});
type FormData = z.infer<typeof formSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAdmin: false,
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data);

      if (response?.status === "error") {
        toast.error(response.message);
      } else {
        toast.success("Logged in successfully!");
        const next =
          searchParams.get("next") ||
          `/dashboard/${data.isAdmin ? "admin" : "user"}`;
        router.push(next);
      }
      setIsLoading(false);
    } catch (error) {
      // console.log(error);

      toast.error((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className=" flex items-center justify-center bg-gray-50 py-10 px-2 sm:px-3 lg:px-8"
    >
      <motion.div variants={slideIn} className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />

          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                {...register("email")}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register("password")}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center px-.5">
            <input id="isAdmin" type="checkbox" {...register("isAdmin")} />
            <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-600">
              Login as admin
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full bg-myPrimary flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Loading..." : "Sign in"}
            </motion.button>
          </div>
        </form>

        <ProviderLogin />

        <div className="text-center mt-4">
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
