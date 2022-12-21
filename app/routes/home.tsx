import { useQuery } from "@apollo/client";
import NavigationBar from "~/components/navbar";
import { GET_MATCH_HISTORIES } from "~/graphql/queries";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Auth0Profile } from "remix-auth-auth0";
import { auth } from "~/utils/auth.server";
import type { LoaderFunction } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import { useTable } from 'react-table'

type LoaderData = { profile: Auth0Profile };

export const loader: LoaderFunction = async ({ request }) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: "/"
  });

  return json<LoaderData>({ profile });
};

export default function Home() {
  const { profile } = useLoaderData<LoaderData>();
  const queryMatchHistories = useQuery(GET_MATCH_HISTORIES)
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await queryMatchHistories.data.matchHistories
      setData(data)  
    }

    fetchData()
    if(queryMatchHistories.loading || queryMatchHistories.error) { setData([]) }
  }, []);

/*   if(queryMatchHistories.loading || queryMatchHistories.error) { return <><p>Loading...</p></> } */

  /* const data = useMemo(
    () => [
      {
        "name": "Zoidberg",
        "legendPlayed": "Pathfinder",
        "gameLengthSecs": 246,
        "gameStartTimestamp": 1635538794,
        "gameEndTimestamp": 1635539040,
        "kills": 10,
        "damage": 2318,
        "BRScoreChange": 0,
        "BRScore": 6221,
        "map": "BROKEN_MOON",
      },
      {
        "name": "Zoidberg",
        "legendPlayed": "Horizon",
        "gameLengthSecs": 246,
        "gameStartTimestamp": 1635538794,
        "gameEndTimestamp": 1635539040,
        "kills": 1,
        "damage": 231,
        "BRScoreChange": 0,
        "BRScore": 6221,
        "map": "BROKEN_MOON",
      },
      {
        "name": "Zoidberg",
        "legendPlayed": "Lifeline",
        "gameLengthSecs": 346,
        "gameStartTimestamp": 1635538794,
        "gameEndTimestamp": 1635539040,
        "kills": 10,
        "damage": 2318,
        "BRScoreChange": 0,
        "BRScore": 6221,
        "map": "BROKEN_MOON",
      },
    ],
    []
  ) */
  /* return <>{JSON.stringify(data)}</> */

/*   if(loading || error) { return <></> } */
  
  const columns = useMemo<any>(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Legend played',
        accessor: 'legendPlayed',
      },
      {
        Header: 'Map',
        accessor: 'map',
      },
      {
        Header: 'Score Change',
        accessor: 'BRScoreChange',
      },
      {
        Header: 'Score',
        accessor: 'BRScore',
      },
      {
        Header: 'Length',
        accessor: 'gameLengthSecs',
      },
    ],
    []
  )
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  const tableInstance = useTable({ columns, data })
  
  return (
    <>
      <NavigationBar profile={profile} />
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
    </>
  );
}
