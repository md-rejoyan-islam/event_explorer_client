"use client";

import { fadeIn, slideIn, staggerChildren } from "@/utils/animations";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./contact-form";

export default function ContactPage({
  user,
}: {
  user: {
    name: string;
    email: string;
    id: string;
  };
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="max-width py-6 md:py-10 mx-auto px-3 relative"
    >
      <motion.h1
        variants={fadeIn}
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
      >
        Contact Us
      </motion.h1>

      <motion.div
        variants={slideIn}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Get in Touch
          </h2>
          <ContactForm user={user} />
        </div>
        {/* Contact Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2 text-myAccent" />
              <p>info@eventexplorer.com</p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 text-myAccent" />
              <p>+1 (123) 456-7890</p>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 text-myAccent" />
              <p>123 Event Street, City, State 12345</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twiter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M23 3.5a9.5 9.5 0 01-2.75.75 4.75 4.75 0 002.083-2.625 9.5 9.5 0 01-3.025 1.15 4.75 4.75 0 00-8.167 4.325 13.5 13.5 0 01-9.825-5 4.75 4.75 0 001.467 6.325 4.75 4.75 0 01-2.15-.575v.05a4.75 4.75 0 003.8 4.65 4.75 4.75 0 01-2.125.075 4.75 4.75 0 004.45 3.3 9.5 9.5 0 01-5.575 1.825 13.5 13.5 0 007.3 2.15c8.825 0 13.675-7.3 13.675-13.675 0-.2 0-.4-.025-.6a9.75 9.75 0 002.5-2.5"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
