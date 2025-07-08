import ApolloClientProvider from "@/components/provider/apollo-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Explorer",
  description: "Discover and explore exciting events in your area",
  keywords: [
    "events",
    "event management",
    "event discovery",
    "event planning",
    "local events",
    "community events",
    "event calendar",
    "event organizer",
    "event registration",
  ],
  authors: [
    {
      name: "Rejoyan",
      url: "https://md-rejoyan-islam.github.io",
    },
  ],
  creator: "Rejoyan",
  openGraph: {
    title: "Event Explorer",
    description: "Discover and explore exciting events in your area",
    url: "https://event-explorer.vercel.app",
    siteName: "Event Explorer",
    images: [
      {
        url: "/logo/logo.png",
        width: 800,
        height: 600,
        alt: "Event Explorer Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value;

  return (
    <html lang="en">
      <body className={`${inter.className} bg-myBackground text-myText`}>
        <ApolloClientProvider token={token}>{children}</ApolloClientProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
