import React from 'react'
import Map from './Map'
import { Waypoint } from '../services/models/Waypoint'
import { MapIcon, TrashIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { DeleteWaypointMutation } from '../services/graphql/mutations'
import { WaypointsQuery } from '../services/graphql/queries'
import { useSession } from 'next-auth/react'

interface WaypointCardProps {
  waypoint: Waypoint
}

function getLinkForWaypoint(waypoint: Waypoint) {
  // create a link search for the waypoint on Google Maps
  return `https://www.google.com/maps/search/?api=1&query=${waypoint.lat},${waypoint.lng}`
}

export const WaypointCard = (props: WaypointCardProps) => {
  const { data: session, status } = useSession();
  const [deleteWaypoint, deleteWaypointMutation] = useMutation(DeleteWaypointMutation, {
    refetchQueries: [
      {
        query: WaypointsQuery,
        variables: {
          userId: session.user.id,
        },
      },
    ],
  });

  const handleDelete = (e) => {
    e.preventDefault();
    deleteWaypoint({variables: {waypointId: props.waypoint.id}});
  }

  return (
    <div className="bg-white rounded-lg flex flex-row px-6 py-4 items-center justify-between">
      <div className="flex flex-col">
        <h2 className="card-title">{props.waypoint.name}</h2>
        <p>{props.waypoint.address}</p>
      </div>
      <div className="flex flex-row space-x-2">
        <Link href={getLinkForWaypoint(props.waypoint)}>
          <button className="bg-blue-100 rounded-lg p-3"><MapIcon className="w-6 h-6 text-blue-600"/></button>
        </Link>
        <button className="bg-red-100 rounded-lg p-3" onClick={handleDelete}><TrashIcon className="w-6 h-6 text-red-600"/></button>
      </div>
    </div>
  )
}
