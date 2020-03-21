import React, { useEffect, useState } from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
} from "react-google-maps"
import getDistance from "geolib/es/getDistance"

import { messages } from "../data"

const Message = ({ from, coordinates, currentLocation }) => {
  const center = { lat: coordinates[1], lng: coordinates[0] }

  if (currentLocation) {
    const distance = getDistance(
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
        radius: 10,
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
