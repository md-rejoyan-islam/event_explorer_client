"use client";

import { fadeIn, slideIn } from "@/utils/animations";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={slideIn}
        className="max-w-md w-full space-y-8 text-center"
      >
        <h1 className="text-4xl font-bold text-myPrimary">
          Oops! Something went wrong
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="mt-5 space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="inline-flex bg-myPrimary items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try again
          </motion.button>
          <div>
            <Link href="/">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go back home
              </motion.a>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
