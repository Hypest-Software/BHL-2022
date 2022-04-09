import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useSession } from 'next-auth/react'
import { User } from '../services/models/User'
import NotAuthorised from '../components/NotAuthorised'
import { useLazyQuery, useMutation } from '@apollo/client'
import { WaypointsQuery } from '../services/graphql/queries'
import Loading from '../components/Loading'
import WaypointsList from '../components/WaypointsList'
import Link from 'next/link'
import { CreateWaypointMutation } from '../services/graphql/mutations'
function Settings(props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [nameValue, setNameValue] = React.useState(null);
  const [addressValue, setAddressValue] = React.useState(null);

  const [fetchWaypoints, waypoints] = useLazyQuery(WaypointsQuery)
  const [createWaypoint, createWaypointMutation] = useMutation(
    CreateWaypointMutation,
    {
      refetchQueries: [
        {
          query: WaypointsQuery,
          variables: {
            userId: session?.user.id,
          },
        },
      ],
    }
  )

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchWaypoints({ variables: { userId: session.user.id } })
    }
  }, [fetchWaypoints, session])

  const handleAdd = (e) => {
    e.preventDefault();
    createWaypoint({variables: {address: addressValue, name: nameValue, userId: session.user.id}});
  }

  if (loading || waypoints.loading) {
    return <></>
  }

  if (!session) {
    return <NotAuthorised />
  }

  return (
    <Layout user={session.user as User}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Zapisane miejsca</h1>
        </div>
      </header>
      <main className="bg-gray-100  shadow">
        <div className="flex flex-col max-w-7xl mx-4 py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
          <h1 className="text-lg font-medium mb-1">Dodaj nowe miejsce</h1>
          <div className="flex flex-row max-w-lg space-x-2">
            <input
              type="text"
              placeholder="Nazwa"
              className="input input-bordered w-full max-w-xs"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            <input
              type="text"
              placeholder="Adres"
              className="input input-bordered w-full max-w-xs"
              value={addressValue}
              onChange={(e) => setAddressValue(e.target.value)}
            />
          </div>
          <button onClick={handleAdd} className="btn btn-sm flex-shrink self-end mt-2">Dodaj miejsce</button>
            {!waypoints.data || waypoints.loading ? (
              <Loading />
            ) : (
              <div className="mt-6">
                <WaypointsList waypoints={waypoints.data.favoriteWaypoints} />
              </div>
            )}
        </div>
      </main>
    </Layout>
  )
}

export default Settings
