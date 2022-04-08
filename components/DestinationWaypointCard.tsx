import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { TransitInfoQuery } from "../services/graphql/queries";
import { TransitInfo } from "../services/models/TransitInfo";
import { Waypoint } from "../services/models/Waypoint";

interface DestinationWaypointCardProps {
  waypoint: Waypoint;
}

function genRandomDelayValue(duration: number) {
  const min = Math.floor(duration * 0.15);
  const max = duration * 0.5;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const DestinationWaypointCard = (props: DestinationWaypointCardProps) => {
  const [fetchTransitData, transitData] = useLazyQuery(TransitInfoQuery);

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
              originLng: position.coords.longitude
            }
          });
        });
      }
    }
  }, [fetchTransitData, props.waypoint]);

  if (transitData.loading || !transitData.called) {
    return <></>;
  }
  // let duration = props.transit_info.duration;
  let duration = transitData.data?.duration;
  let delay = genRandomDelayValue(duration);
  let durationColor = delay > 0.3 * duration ? "text-red-700" : "text-green-700";

  return (
  <>
    <div className="bg-gray-100 rounded-lg flex justify-between items-center p-4">
      <div className="flex flex-grow align-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{props.waypoint.name}</h1>
          <h4 className="text-gray-600"></h4>
        </div>
        <div className="flex flex-col">
          <span className={durationColor + " font-medium"}>
            {duration + delay} min
          </span>
        </div>
      </div>
    </div>
  </>
  );
}
