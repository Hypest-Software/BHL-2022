import { TransitInfo } from "../models/TransitInfo";
import axios from "axios";

const DIRECTIONS_API_URL =
  "https://maps.googleapis.com/maps/api/directions/json";

export const getTransitInfo = async (
  origin: string,
  destination: string,
  mode: string
): Promise<TransitInfo> => {
  const key = process.env.GOOGLE_API_KEY;
  return axios.get(DIRECTIONS_API_URL, {
    params: {
      origin,
      destination,
      alternatives: false,
      language: "pl_PL",
      mode,
      key,
    },
  });
};
