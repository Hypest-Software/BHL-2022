import React from 'react'
import {
  ActiveRideQuery,
  EndRideMutation,
  StartRideMutation,
} from '../services/graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import Loading from './Loading'

interface StartStopRideProps {
  userId: string
}

export default function StartStopRide(props: StartStopRideProps) {
  const activeRide = useQuery(ActiveRideQuery, {
    variables: {
      userId: props.userId,
    },
  })

  const [startRide, startRideMutation] = useMutation(StartRideMutation, {
    refetchQueries: [
      {
        query: ActiveRideQuery,
        variables: {
          userId: props.userId,
        },
      },
    ],
  })

  const [endRide, endRideMutation] = useMutation(EndRideMutation, {
    refetchQueries: [
      {
        query: ActiveRideQuery,
        variables: {
          userId: props.userId,
        },
      },
    ],
  })

  if (activeRide.loading) {
    return <Loading />
  }
  if (activeRide.error) {
    return <div>{JSON.stringify(activeRide.error)}</div>
  }

  const isRideActive = Boolean(activeRide.data.activeRide)

  const handleStartStop = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      if (!isRideActive) {
        await startRide({
          variables: {
            userId: props.userId,
            start_lat: position.coords.latitude,
            start_lng: position.coords.longitude,
          },
        })
      } else {
        await endRide({
          variables: {
            userId: props.userId,
            rideId: activeRide.data.activeRide.id,
            start_lat: position.coords.latitude,
            start_lng: position.coords.longitude,
          },
        })
      }
    })
  }

  const getTitle = () => {
    return isRideActive ? 'Zakończ przejazd' : 'Rozpocznij przejazd'
  }

  return (
    <div className="max-w-7xl mx-4 space-y-4 py-4 sm:px-8 lg:px-8">
      <button
        className="btn-primary active:btn-secondary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => handleStartStop()}
      >
        {getTitle()}
      </button>
    </div>
  )
}
