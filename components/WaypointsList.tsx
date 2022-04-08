import { Post } from "../services/models/Post";
import React from "react";
import { PostCard } from "./PostCard";
import {Waypoint} from "../services/models/Waypoint";
import {WaypointCard} from "./WaypointCard";

interface WaypointsListProps {
  waypoints: Waypoint[];
}

export default function WaypointsList(props: WaypointsListProps) {
  if (props.waypoints.length == 0) {
    return (
      <div className="text-center">
        <span>No posts to display</span>
      </div>
    );
  }

  return (
    <>
      {props.waypoints.map((waypoint) => (
        <div key={waypoint.id} className="card">
          <WaypointCard waypoint={waypoint} />
        </div>
      ))}
      <style jsx>{`
        .card {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .card:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .card + .card {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
}
