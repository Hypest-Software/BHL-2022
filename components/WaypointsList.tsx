import React from 'react'
import { WaypointCard } from './WaypointCard'
import { Waypoint } from '../services/models/Waypoint'

interface WaypointsListProps {
  waypoints: Waypoint[]
}

export default function WaypointsList(props: WaypointsListProps) {
  if (props.waypoints.length == 0) {
    return (
      <div className="text-center">
        <span>Brak zapisanych miejsc.</span>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        {props.waypoints.map((waypoint) => (
          <div key={waypoint.id}>
            <WaypointCard waypoint={waypoint} />
          </div>
        ))}
      </div>
    </>
  )
}
