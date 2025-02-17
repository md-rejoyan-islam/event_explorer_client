"use client";
import apolloClient from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export default function ApolloClientProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | undefined;
}) {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  apolloClient.setLink(authLink.concat(apolloClient.link));

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
