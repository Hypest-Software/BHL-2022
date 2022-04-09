import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useSession } from 'next-auth/react'
import { User } from '../services/models/User'
import NotAuthorised from '../components/NotAuthorised'
import { useLazyQuery } from '@apollo/client'
import { WaypointsQuery } from '../services/graphql/queries'
import Loading from '../components/Loading'
import WaypointsList from '../components/WaypointsList'
import Link from 'next/link'
function Settings(props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [fetchWaypoints, waypoints] = useLazyQuery(WaypointsQuery)

  useEffect(() => {
    // @ts-ignore
    if (session && session.user.id) {
      // @ts-ignore
      fetchWaypoints({ variables: { userId: session.user.id } })
    }
  }, [fetchWaypoints, session])

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
      <main className="bg-gray-200 shadow">
        <div className="flex flex-col bg-gray-100 max-w-7xl space-y-2 mx-auto py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
            <Link href="/settings">
              <button className="btn btn-sm flex-shrink self-center mt-2 mb-4">Dodaj miejsce</button>
            </Link>
            {!waypoints.data || waypoints.loading ? (
              <Loading />
            ) : (
              <WaypointsList waypoints={waypoints.data.favoriteWaypoints} />
            )}
          </div>
      </main>
    </Layout>
  )
}

export default Settings
