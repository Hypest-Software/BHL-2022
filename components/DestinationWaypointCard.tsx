import { useLazyQuery } from '@apollo/client'
import { TravelMode } from '@googlemaps/google-maps-services-js'
import { ArrowRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useEffect } from 'react'
import { TransitInfoQuery } from '../services/graphql/queries'
import { TransitInfo } from '../services/models/TransitInfo'
import { Waypoint } from '../services/models/Waypoint'

interface DestinationWaypointCardProps {
  waypoint: Waypoint
}

function genRandomDelayValue(duration: number) {
  const min = Math.floor(duration * 0.15)
  const max = duration * 0.5
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getLinkForWaypoint(waypoint: Waypoint) {
  // create a link search for the waypoint on Google Maps
  return `https://www.google.com/maps/search/?api=1&query=${waypoint.lat},${waypoint.lng}`
}

export const DestinationWaypointCard = (
  props: DestinationWaypointCardProps
) => {
  const [fetchTransitData, transitData] = useLazyQuery(TransitInfoQuery)

  useEffect(() => {
    // @ts-ignore
    if (props.waypoint.id) {
      // @ts-ignore
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          fetchTransitData({
            variables: {
              waypointId: props.waypoint.id,
              originLat: position.coords.latitude,
              originLng: position.coords.longitude,
            },
          })
        })
      }
    }
  }, [fetchTransitData, props.waypoint])

  if (
    transitData.loading ||
    !transitData.called ||
    !transitData.data.transitInfo
  ) {
    return <></>
  }

  let travelPossible = transitData.data.transitInfo.travelMode != 'WALKING'
  let durationColor = 'text-gray-600'
  let delay = 0
  let duration = Math.ceil(transitData.data?.transitInfo.duration / 60)

  if (travelPossible) {
    delay = genRandomDelayValue(duration)
    durationColor = delay > 0.3 * duration ? 'text-red-700' : 'text-green-700'
  }

  return (
    <>
      <Link href={getLinkForWaypoint(props.waypoint)}>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex flex-grow align-center justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">{props.waypoint.name}</h1>
              <h4 className="text-gray-600">{props.waypoint.address}</h4>
            </div>
            <div className="flex flex-row items-center">
              <div className={durationColor + ' flex flex-col items-center'}>
                {travelPossible ? (
                  <>
                    <div className="text-3xl font-medium">{duration}</div>
                    <div className="text-sm -mt-1">min</div>
                  </>
                ) : (
                  <div>pieszo!</div>
                )}
              </div>
              <ArrowRightIcon
                className={`ml-3 h-6 w-6 mb-0.5 ${durationColor}`}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
