"use client";

import { fadeIn, slideIn, staggerChildren } from "@/utils/animations";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="max-width py-6 md:py-10 mx-auto px-3 relative"
    >
      <motion.h1
        variants={fadeIn}
        className="text-4xl font-bold mb-8 text-center text-myPrimary"
      >
        Contact Us
      </motion.h1>

      <motion.div
        variants={slideIn}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-mySecondary">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
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
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
              ></textarea>
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
        </div>
        {/* Contact Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-mySecondary">
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
