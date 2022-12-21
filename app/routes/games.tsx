import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Auth0Profile } from "remix-auth-auth0";
import NavigationBar from "~/components/navbar";
import { auth } from "~/utils/auth.server";

type LoaderData = { profile: Auth0Profile };

export const loader: LoaderFunction = async ({ request }) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/"
  });

  return json<LoaderData>({ profile });
};

export default function Games() {
  const { profile } = useLoaderData<LoaderData>();
  
  return (
    <>
      <p>GAMES</p>
    </>
  )
}
