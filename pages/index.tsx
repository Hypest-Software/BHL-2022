import Layout from '../components/Layout'
import {useLazyQuery} from '@apollo/client'
import {useSession} from 'next-auth/react'
import {User} from '../services/models/User'
import NotAuthorised from '../components/NotAuthorised'
import React, {useEffect} from 'react'
import {UserQuery, WaypointsQuery} from '../services/graphql/queries'
import DestinationWaypointsList from '../components/DestinationWaypointsList'
import AirPollutionCard from '../components/AirPollutionCard'
import StartStopRide from '../components/StartStopRide'
import Link from 'next/link'
import StartStopRideModal from '../components/StartStopRideModal'

const Home = () => {
    const {data: session, status} = useSession()
    const loading = status === 'loading'

  const [isRideModalOpen, setIsRideModalOpen] = React.useState(false)

  const [fetchUserData, userData] = useLazyQuery(UserQuery)
  const [fetchWaypointsData, waypointsData] = useLazyQuery(WaypointsQuery)

    useEffect(() => {
        // @ts-ignore
        if (session && session.user.id) {
            // @ts-ignore
            fetchUserData({variables: {userId: session.user.id}})
            // @ts-ignore
            fetchWaypointsData({variables: {userId: session.user.id}})
        }
    }, [fetchUserData, fetchWaypointsData, session])

    if (loading) {
        return <></>
    }

    if (!session) {
        return <NotAuthorised/>
    }

    if (userData.error) {
        return <div>Error: {userData.error.message}</div>
    }

  // @ts-ignore
  return (
    <Layout user={session.user as User}>
      <header className="bg-white">
        <div className="flex justify-between mx-auto pt-6 pb-2 px-4 items-center max-w-screen-xl">
          <div className="max-w-7xl mx-autosm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-800">
              <span className="font-normal">Witaj</span> {session.user.name}!
            </h1>
            <h3 className="text-gray-600">
              Twoje saldo:{' '}
              <span className="font-semibold">
                {userData.data ? userData.data.user.balance.toFixed(2) : 0}z??
              </span>
                        </h3>
                    </div>
                    <div className="flex-shrink-0">
                        <img
                            className="h-14 w-14 rounded-full"
                            src={session.user.image}
                            alt=""
                        />
                    </div>
                </div>
            </header>
            <main className="bg-white">
                <div className="max-w-7xl mx-4 py-2 sm:px-8 lg:px-8">
                    <AirPollutionCard/>
                </div>
                <div className="flex py-2 px-4 justify-center">
                    <StartStopRide userId={session.user.id}/>
                </div>
                <div className="max-w-7xl mx-4 space-y-4 py-2 sm:px-8 lg:px-8">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-xl font-semibold -mb-2">Ulubione miejsca</h1>
                        <Link href="/settings">
                            <button
                                hidden={!waypointsData.data}
                                className="btn-sm bg-gray-100 rounded-lg uppercase"
                            >
                                edytuj
                            </button>
                        </Link>
                    </div>
                    <DestinationWaypointsList
                        waypoints={
                            waypointsData.data ? waypointsData.data.favoriteWaypoints : []
                        }
                    />
                </div>
            </main>
        </Layout>
    )
}

export default Home
