import {Author} from "./Author";
import {TransitInfo} from "./TransitInfo";

export interface WaypointWithTransitInfo {
    id: string;
    name: string;
    lat: number;
    lng: number;
    author: Author;
    transit: TransitInfo;
}
