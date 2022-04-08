import React from "react";
import {GoogleMap} from "react-google-maps";
import {Waypoint} from "../services/models/WaypointWithTransitInfo";


interface WaypointCardProps {
    waypoint: Waypoint;
}

export const WaypointCard = (props: WaypointCardProps) => {

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{props.waypoint.name}</h2>
                <div className="google-map-code">
                    <GoogleMap
                        defaultZoom={8}
                        defaultCenter={{
                            lat: props.waypoint.lat, lng: props.waypoint.lng
                        }}
                    >
                    </GoogleMap>
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-secondary">DELETE</button>
                </div>
            </div>
        </div>
    )
};
