"use client";
import apolloClient from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

export default function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
