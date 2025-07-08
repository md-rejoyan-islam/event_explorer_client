"use client";

import { deleteCookie } from "cookies-next";
import {
  Calendar,
  House,
  LogOut,
  Mails,
  Menu,
  PlusCircle,
  UserCircle,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const adminLinks = [
  {
    href: "/dashboard/admin",
    label: "Home",
    icon: House,
  },
  { href: "/dashboard/admin/all-events", label: "All Events", icon: Calendar },
  {
    href: "/dashboard/admin/create-event",
    label: "Create Event",
    icon: PlusCircle,
  },
  {
    href: "/dashboard/admin/messages",
    label: "Messages",
    icon: Mails,
  },
  { href: "/dashboard/admin/profile", label: "Profile", icon: UserCircle },
];

const userLinks = [
  {
    href: "/dashboard/user",
    label: "Home",
    icon: House,
  },
  {
    href: "/dashboard/user/my-events",
    label: "Enrolled Events",
    icon: Calendar,
  },
  {
    href: "/dashboard/user/messages",
    label: "Messages",
    icon: Mails,
  },
  { href: "/dashboard/user/profile", label: "Profile", icon: UserCircle },
];

export default function Sidebar({ user }: { user: { role: string } }) {
  const pathname = usePathname();
  const isAdmin = user.role?.toLocaleLowerCase() === "admin";
  const links = isAdmin ? adminLinks : userLinks;
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      redirectTo: "/login",
    });
    deleteCookie("token");
    router.refresh();
  };

  return (
    <>
      <button
        className="md:hidden fixed top-3 left-4  p-2 bg-white rounded-md shadow-md border border-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
      </button>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 min-h-screen flex flex-col gap-7 justify-between  transition duration-200 ease-in-out md:w-64 bg-white shadow-md z-10`}
      >
        <div>
          <div className="p-4 relative">
            <h1 className="text-2xl font-bold">Event Dashboard</h1>
            <button
              className={`md:hidden  top-0 -right-8 z-20 p-1.5 bg-red-100  absolute ${
                isOpen ? "block" : "hidden"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <X className="h-5 w-5 text-red-600" />
            </button>
          </div>
          <nav className="mt-8">
            <ul>
              {links?.length &&
                links.map((link: SidebarLink, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                        pathname === link.href ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon className="mr-2 h-5 w-5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-gray-200">
          <Link
            href={"/"}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 "
          >
            <House className="mr-2 h-5 w-5" />
            Home
          </Link>
          <Link
            href={"/login"}
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 bg-red-100 hover:bg-red-200"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
