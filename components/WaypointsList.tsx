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
        <span>No posts to display</span>
      </div>
    )
  }

  return (
    <>
      {props.waypoints.map((waypoint) => (
        <div key={waypoint.id}>
          <WaypointCard waypoint={waypoint} />
        </div>
      ))}
    </>
  )
}
