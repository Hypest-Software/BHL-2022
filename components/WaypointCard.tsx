import React from "react";
import {Waypoint} from "../services/models/Waypoint";

interface WaypointCardProps {
    waypoint: Waypoint;
}

export const WaypointCard = (props: WaypointCardProps) => (
    <div>
        <h2>{props.waypoint.name}</h2>

    </div>
);
