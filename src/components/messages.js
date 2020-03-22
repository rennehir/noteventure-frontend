import React, { useEffect, useState } from "react"
import { Circle } from "react-google-maps"
import getDistance from "geolib/es/getDistance"

const Messages = ({ currentLocation, messages }) => {
  const [readMessages, setReadMessages] = useState([])

  const handleReadMessage = message => {
    alert(`FROM: ${message.from} \n\n${message.text}`)
    const readMessagesStorage =
      JSON.parse(localStorage.getItem("readMessages")) || []
    readMessagesStorage.push(message.id)
    localStorage.setItem("readMessages", JSON.stringify(readMessagesStorage))
    setReadMessages(prev => [...prev, message.id])
  }

  return (
    <>
      {messages
        .filter(message => !readMessages.includes(message.id))
        .map(message => (
          <Message
            key={message.id}
            message={message}
            currentLocation={currentLocation}
            handleReadMessage={handleReadMessage}
          />
        ))}
    </>
  )
}

const Message = ({ message, currentLocation, handleReadMessage }) => {
  const { location } = message
  const center = { lat: location.coordinates[1], lng: location.coordinates[0] }

  let distance
  if (currentLocation) {
    distance = getDistance(
      { latitude: location.coordinates[1], longitude: location.coordinates[0] },
      {
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
      }
    )
  }

  const handleTooFar = () => {
    alert("Go closer to see the message")
  }

  const isTooFar = distance > 300

  return (
    <Circle
      onClick={isTooFar ? handleTooFar : () => handleReadMessage(message)}
      options={{
        center,
        radius: isTooFar ? 300 : 10,
        fillColor: "#ffde59",
        fillOpacity: 0.3,
        strokeOpacity: 0.6,
        strokeColor: "#ec6433",
        strokeWeight: 3,
        zIndex: isTooFar ? 300 : 1000,
      }}
    />
  )
}

export default Messages
