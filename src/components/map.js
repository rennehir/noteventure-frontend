import React, { useEffect, useState } from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  Marker,
} from "react-google-maps"
import getDistance from "geolib/es/getDistance"

import { messages } from "../data"

const Message = ({ from, coordinates, currentLocation }) => {
  const center = { lat: coordinates[1], lng: coordinates[0] }

  let distance
  if (currentLocation) {
    distance = getDistance(
      { latitude: coordinates[1], longitude: coordinates[0] },
      {
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
      }
    )

    console.log(`Distance to message from ${from} is ${distance}`)
  }

  return (
    <Circle
      options={{
        center,
        radius: distance > 300 ? 300 : 10,
      }}
    />
  )
}

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
        {messages.map(message => (
          <Message
            key={message.id}
            {...message}
            currentLocation={currentLocation}
          />
        ))}
      </GoogleMap>
    )
  })
)

export default Map
