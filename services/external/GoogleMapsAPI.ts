import {Client, Language, TravelMode,} from "@googlemaps/google-maps-services-js";
import {TransitInfo} from "../models/TransitInfo";

const getTravelMode = (mode: string): TravelMode => {
    switch (mode) {
        case "walking":
            return TravelMode.walking;
        case "bicycling":
            return TravelMode.bicycling;
        case "transit":
            return TravelMode.transit;
        case "driving":
            return TravelMode.driving;
        default:
            return TravelMode.driving;
    }
};

export const reverseGeocoding = async (lat: number, lng: number): Promise<string> => {
    const client = new Client({});
    const response = await client.reverseGeocode({
        params: {
            latlng: `${lat},${lng}`,
            key: process.env.GOOGLE_MAPS_API_KEY,
            language: Language.pl,
        },
    });
    if (response.data.status === "OK") {
        return response.data.results[0].formatted_address;
    } else {
        return "";
    }
};


export const getTransitInfo = async (
    origin: string,
    destination: string,
    mode: string
): Promise<TransitInfo> => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const client = new Client({});
    const response = await client.directions({
        params: {
            origin,
            destination,
            alternatives: false,
            language: Language.pl,
            mode: getTravelMode(mode),
            key,
        },
    });

    const travel_modes = response.data.routes[0].legs[0].steps.map((step) => {
        return step.travel_mode;
    });
    const travel_mode = travel_modes.find((mode) => {
        return mode !== TravelMode.walking;
    });

    return {
        arrivalTime: response.data.routes[0].legs[0].arrival_time.value,
        departureTime: response.data.routes[0].legs[0].departure_time.value,
        distance: response.data.routes[0].legs[0].distance.value,
        duration: response.data.routes[0].legs[0].duration.value,
        travelMode: travel_mode,
    };
};
