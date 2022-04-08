import {Author} from "./Author";

export interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  author: Author;
}
