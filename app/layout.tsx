import ApolloClientProvider from "@/components/provider/apollo-provider";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Explorer",
  description: "Discover and explore exciting events in your area",
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
