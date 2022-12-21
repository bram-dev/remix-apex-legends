import { useQuery } from "@apollo/client";
import { GET_MATCH_HISTORIES } from "~/graphql/queries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_MATCH_HISTORIES)
  
  return (
    <>
      <p>
        {loading || error ? <p>Loading...</p> : <p>{JSON.stringify(data)}</p>}
      </p>
    </>
  );
}