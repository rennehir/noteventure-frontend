import React, { useState } from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"

import Messages from "./messages"

const MyLocation = ({ position }) => {
  return (
    <Marker
      position={position}
      icon={{
        anchor: { x: 0, y: 20 },
        path: `
          M -20, 20
          a 20,20 0 1,0 40,0
          a 20,20 0 1,0 -40,0
        `,
        fillColor: "blue",
        fillOpacity: 0.8,
        strokeColor: "white",
        strokeWeight: 3,
      }}
    />
  )
}

const Map = withScriptjs(
  withGoogleMap(({ currentLocation }) => {
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 62.2407502069861, lng: 25.7643105987017 }}
      >
        <MyLocation position={currentLocation} />
        <Messages currentLocation={currentLocation} />
      </GoogleMap>
    )
  })
)

export default Map
