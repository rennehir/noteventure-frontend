import React, { useEffect, useState } from "react"
import { Circle } from "react-google-maps"
import getDistance from "geolib/es/getDistance"

import { getMessages } from "../data"

const Messages = ({ currentLocation }) => {
  const [messages, setMessages] = useState([])
  const [readMessages, setReadMessages] = useState([])

  const handleReadMessage = message => {
    alert(`FROM: ${message.from} \n\n${message.text}`)
    const readMessagesStorage =
      JSON.parse(localStorage.getItem("readMessages")) || []
    readMessagesStorage.push(message.id)
    localStorage.setItem("readMessages", JSON.stringify(readMessagesStorage))
    setReadMessages(prev => [...prev, message.id])
  }

  useEffect(() => {
    getMessages().then(setMessages)
  })

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
  const { from, coordinates } = message
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
      }}
    />
  )
}

export default Messages
