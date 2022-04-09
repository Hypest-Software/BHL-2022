import {
  Client,
  Language,
  TravelMode,
} from '@googlemaps/google-maps-services-js'
import { TransitInfo } from '../models/TransitInfo'

const getTravelMode = (mode: string): TravelMode => {
  switch (mode) {
    case 'walking':
      return TravelMode.walking
    case 'bicycling':
      return TravelMode.bicycling
    case 'transit':
      return TravelMode.transit
    case 'driving':
      return TravelMode.driving
    default:
      return TravelMode.driving
  }
}

export const reverseGeocoding = async (
  lat: number,
  lng: number
): Promise<string> => {
  const client = new Client({})
  const response = await client.reverseGeocode({
    params: {
      latlng: `${lat},${lng}`,
      key: process.env.GOOGLE_MAPS_API_KEY,
      language: Language.pl,
    },
  })
  if (response.data.status === 'OK') {
    return response.data.results[0].formatted_address
  } else {
    return ''
  }
}

export const geocoding = async (
  address: string
): Promise<number[]> => {
  const client = new Client({})
  const response = await client.geocode({
    params: {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY,
      language: Language.pl,
    },
  })
  if (response.data.status === 'OK') {
    return [
      response.data.results[0].geometry.location.lat,
      response.data.results[0].geometry.location.lng,
    ]
  } else {
    return [0, 0]
  }
}

export const getTransitInfo = async (
  origin: string,
  destination: string,
  mode: string
): Promise<TransitInfo> => {
  const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&alternatives=false&language=pl_PL&mode=${mode}&key=${key}`
  )

  const data = await response.json()
  if (data.status === 'ZERO_RESULTS') {
    return {
      arrivalTime: null,
      departureTime: null,
      distance: null,
      duration: null,
      travelMode: 'WALKING',
    }
  }

  const travel_modes = data.routes[0].legs[0].steps.map((step) => {
    return step.travel_mode
  })
  const travel_mode = travel_modes.find((mode) => {
    return mode !== 'WALKING'
  })

  return {
    arrivalTime: data.routes[0].legs[0].arrival_time.value,
    departureTime: data.routes[0].legs[0].departure_time.value,
    distance: data.routes[0].legs[0].distance.value,
    duration: data.routes[0].legs[0].duration.value,
    travelMode: travel_mode,
  }
}
