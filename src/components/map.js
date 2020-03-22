import React from "react"
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
        fillColor: "#ec6433",
        fillOpacity: 0.8,
        strokeColor: "#737373",
        strokeWeight: 3,
      }}
    />
  )
}

const Map = withScriptjs(
  withGoogleMap(({ currentLocation, messages }) => {
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={
          currentLocation || { lat: 62.2407502069861, lng: 25.7643105987017 }
        }
      >
        <MyLocation position={currentLocation} />
        <Messages currentLocation={currentLocation} messages={messages} />
      </GoogleMap>
    )
  })
)

export default Map
