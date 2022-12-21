import { createContext } from "react";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'

const isBrowser = typeof window !== "undefined";

const initialState = isBrowser ? window.__INITIAL_STATE__ : {};

const httpLink = new HttpLink({
  uri: "http://localhost:2000/graphql",
})

const headerLink = setContext(async (_, context) => {
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRMeExzTWhkdjVsZWFEWFZXc2tLQSJ9.eyJpc3MiOiJodHRwczovL2Rldi0wNnl2ZTZpaG84bXRrbXJsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJrN0JuYWZHQ25ydzg2dndxSGNnM21LaFNHbXF1WUU0VEBjbGllbnRzIiwiYXVkIjoiaHR0cDovL1s6OjFdOjIwMDAvZ3JhcGhxbCIsImlhdCI6MTY3MTYzMzA4OSwiZXhwIjoxNjcxNzE5NDg5LCJhenAiOiJrN0JuYWZHQ25ydzg2dndxSGNnM21LaFNHbXF1WUU0VCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.hy7GBqnYca_bD1Xa_80TPHGseOXVwOwH1_ehMMnk5HKSMyXGSOBl9mNcY7Y3ynnCwgHvsiYBEKMuhNpqWKfRC0SsjbxlNse__1SjGc159425RyTCknrcUMgS26-W8leF7D095eWQlkUlmtuGBAaZj54_FBpv8G7fU42tivszEe0xIFjwcDFoMKFaXK0g5ju0ijaXsce0vg6IH8ZPseyaxIeNKgoOoG-hCJDSz0PG84phaUWq28IKYlCcFbUge2-0DY12BTaoMgNSkmjQitDZST3XikCcSr-DCGyPlD5Xlb_tGxpKOLZ2_ohEW42w2XjEPHgN5eomDGI30yocH4GzGQ"
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
    ...context,
  }
})

export function initApollo(ssrMode = true) {
  return new ApolloClient({
    link: ApolloLink.from([headerLink, httpLink]),
    cache: new InMemoryCache().restore(initialState),
    ssrMode,
  });
}

export default createContext(initialState);