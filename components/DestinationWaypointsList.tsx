import { ArrowRightIcon } from "@heroicons/react/outline";
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
        <div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex flex-grow align-center justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-xl font-medium">Inny adres...</h1>
            </div>
            <div className="flex flex-row items-center">
              <span className="font-medium">
                wybierz
              </span>
              <ArrowRightIcon className={`ml-2 h-6 w-6 mb-0.5`}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
