import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function ProviderLogin() {
  const searchParams = useSearchParams();

  const next = searchParams.get("next") || "/";

  const handleGoogleLogin = () => {
    signIn("google", { redirect: true, callbackUrl: next });
  };
  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/" });
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => handleGoogleLogin()}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <FaGoogle className="w-5 h-5 text-red-500" />
            <span className="ml-2">Google</span>
          </button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => handleFacebookLogin()}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <FaFacebook className="w-5 h-5 text-blue-600" />
            <span className="ml-2">Facebook</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
