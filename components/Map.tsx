import React from 'react'
import GoogleMapReact from 'google-map-react'

interface MapProps {
  lat: number
  lng: number
}

export default function Map(props: MapProps) {
  return (
    <div style={{ height: '300px', width: '300px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        defaultZoom={17}
      ></GoogleMapReact>
    </div>
  )
}
