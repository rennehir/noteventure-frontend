import React, { useEffect, useState } from "react"
import findNearest from "geolib/es/findNearest"

import { messages } from "../data"

const Info = ({ currentLocation }) => {
  const [nearest, setNearest] = useState(null)

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

      setNearest(
        messages.find(
          m =>
            m.coordinates[1] === n.latitude && m.coordinates[0] === n.longitude
        )
      )
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
        width: "20%",
      }}
    >
      <h2>Info</h2>
      <div>Nearest message is from: {nearest?.from ?? "anonymous"}</div>
    </div>
  )
}

export default Info
