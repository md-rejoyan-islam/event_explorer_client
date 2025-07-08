"use client";

import { GET_USER_BY_EMAIL } from "@/queries/auth.query";
import { fadeIn, slideIn } from "@/utils/animations";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProfileForm from "./profile-form";

export default function Profile({ email }: { email: string }) {
  const { data: { user: userData } = {}, refetch } = useQuery(
    GET_USER_BY_EMAIL,
    {
      variables: { email: email },
    }
  );

  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-6 max-w-[600px] mx-auto"
    >
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        My Profile
      </h2>
      <motion.div variants={slideIn} className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {isEditing ? (
            <ProfileForm
              userData={userData}
              refetch={refetch}
              setIsEditing={setIsEditing}
            />
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Name</h3>
                <p className="mt-1 text-sm text-gray-500">{userData?.name}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-sm text-gray-500">{userData?.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Password</h3>
                <p className="mt-1 text-sm text-gray-500">********</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                <p className="mt-1 text-sm text-gray-500">{userData?.bio}</p>
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
