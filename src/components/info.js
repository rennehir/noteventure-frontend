import React, { useEffect, useState } from "react"
import findNearest from "geolib/es/findNearest"
import getDistance from "geolib/es/getDistance"

import { messages } from "../data"

const Info = ({ currentLocation }) => {
  const [nearest, setNearest] = useState(null)
  const [distance, setDistance] = useState(null)

  useEffect(() => {
    if (currentLocation) {
      const messagesCoord = messages.map(m => ({
        latitude: m.coordinates[1],
        longitude: m.coordinates[0],
      }))
      const n = findNearest(
        { latitude: currentLocation.lat, longitude: currentLocation.lng },
        messagesCoord
      )

      const nearestM = messages.find(
        m => m.coordinates[1] === n.latitude && m.coordinates[0] === n.longitude
      )
      setNearest(nearestM)
      const d = getDistance(
        {
          latitude: nearestM.coordinates[1],
          longitude: nearestM.coordinates[0],
        },
        { latitude: currentLocation.lat, longitude: currentLocation.lng }
      )
      setDistance(d)
    }
  }, [currentLocation])

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        margin: "10px",
        zIndex: 100,
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "10px 15px",
        maxWidth: "40%",
        width: "300px",
      }}
    >
      <h2>Info</h2>
      {nearest && (
        <p>
          Nearest message is from: {nearest?.from ?? "anonymous"} and it's{" "}
          {distance} meters away
        </p>
      )}
    </div>
  )
}

export default Info
