import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getCookie } from "cookies-next";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

// Create an Apollo Client instance
const apolloClient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

export default apolloClient;
