"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fadeIn, slideIn } from "@/utils/animations";
import { deleteCookie } from "cookies-next";

import { motion } from "framer-motion";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";

const Header = ({ user }: { user?: { role: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      redirectTo: "/login",
    });
    deleteCookie("token", {
      sameSite: "lax",
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    });

    router.refresh();
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-white shadow-md"
    >
      <div className="container mx-auto px-4 py-2.5 flex justify-between items-center max-width">
        <Link href="/">
          <motion.h1
            variants={slideIn}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text flex items-center gap-2 cursor-pointer"
          >
            <Image
              src="/logo/logo2.png"
              alt="Event Explorer"
              width={40}
              height={40}
              className=""
            />
            Event Explorer
          </motion.h1>
        </Link>
        <nav className="hidden md:flex space-x-1 items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {!user?.role && <NavLink href="/login">Login</NavLink>}

          {user?.role && (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="end"
                className="mt-2.5 p-0.5 max-w-[180px]"
              >
                <Link
                  href={`/dashboard/${user?.role?.toLowerCase()}`}
                  className="px-4 py-2 text-gray-700 flex items-center gap-1 hover:bg-gray-100 bg-gray-50"
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
                <hr />
                <Link
                  href="#"
                  className="px-4 py-2 text-gray-700 flex items-center gap-1 hover:bg-gray-100 bg-gray-50"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Logout
                </Link>
              </PopoverContent>
            </Popover>
          )}
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
        >
          <NavLink href="/" mobile>
            Home
          </NavLink>
          <NavLink href="/events" mobile>
            Events
          </NavLink>

          <NavLink href="/contact" mobile>
            Contact
          </NavLink>

          {user?.role ? (
            <>
              <NavLink href={`/dashboard/${user?.role?.toLowerCase()}`} mobile>
                Dashboard
              </NavLink>
              <NavLink href="/login" mobile>
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink href="/login" mobile>
              Login
            </NavLink>
          )}
        </motion.div>
      )}
    </motion.header>
  );
};

const NavLink = ({
  href,
  children,
  mobile = false,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`block ${
          mobile ? "px-4 py-2" : "px-3.5 py-1.5 rounded-md"
        } hover:text-blue-500  ${
          isActive
            ? "md:hover:text-white md:text-white  text-blue-500 md:bg-gradient-to-r from-purple-600 to-pink-600"
            : ""
        }`}
      >
        {children}
      </motion.span>
    </Link>
  );
};

export default Header;
