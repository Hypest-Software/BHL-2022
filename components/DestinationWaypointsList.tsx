import React from "react";
import { Waypoint } from "../services/models/Waypoint";
import { DestinationWaypointCard } from "./DestinationWaypointCard";

interface DestinationWaypointsListProps {
  waypoints: Waypoint[];
}

export default function DestinationWaypointsList(
  props: DestinationWaypointsListProps
) {
  if (!props.waypoints || props.waypoints?.length == 0) {
    return (
      <div className="text-center">
        <span>No waypoints saved.</span>
      </div>
    );
  }

  return (
    <>
      {props.waypoints.map((waypoint) => (
        <div key={waypoint.id}>
          <DestinationWaypointCard waypoint={waypoint} />
        </div>
      ))}
    </>
  );
}
