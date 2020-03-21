import React, { useEffect, useState } from "react"
import { Button } from "antd"
import findNearest from "geolib/es/findNearest"
import getDistance from "geolib/es/getDistance"

import { getMessages, createMessage } from "../data"

const Info = ({ currentLocation }) => {
  const [messages, setMessages] = useState([])
  const [nearest, setNearest] = useState(null)
  const [distance, setDistance] = useState(null)
  const [newMessageLoading, setNewMessageLoading] = useState(false)
  const [reloadLoading, setReloadLoading] = useState(false)

  useEffect(() => {
    getMessages().then(messages => {
      if (currentLocation) {
        const messagesCoord = messages.map(m => ({
          latitude: m.location.coordinates[1],
          longitude: m.location.coordinates[0],
        }))
        const n = findNearest(
          { latitude: currentLocation.lat, longitude: currentLocation.lng },
          messagesCoord
        )

        const nearestM = messages.find(
          m =>
            m.location.coordinates[1] === n.latitude &&
            m.location.coordinates[0] === n.longitude
        )
        setNearest(nearestM)
        if (nearestM) {
          const d = getDistance(
            {
              latitude: nearestM.location.coordinates[1],
              longitude: nearestM.location.coordinates[0],
            },
            { latitude: currentLocation.lat, longitude: currentLocation.lng }
          )
          setDistance(d)
        }
      }
      setMessages(messages)
    })
  })

  useEffect(() => {
    if (currentLocation && messages) {
      const messagesCoord = messages.map(m => ({
        latitude: m.location.coordinates[1],
        longitude: m.location.coordinates[0],
      }))
      const n = findNearest(
        { latitude: currentLocation.lat, longitude: currentLocation.lng },
        messagesCoord
      )

      const nearestM = messages.find(
        m =>
          m.location.coordinates[1] === n.latitude &&
          m.location.coordinates[0] === n.longitude
      )
      setNearest(nearestM)
      if (nearestM) {
        const d = getDistance(
          {
            latitude: nearestM.location.coordinates[1],
            longitude: nearestM.location.coordinates[0],
          },
          { latitude: currentLocation.lat, longitude: currentLocation.lng }
        )
        setDistance(d)
      }
    }
  }, [currentLocation, nearest])

  const handleNewMessage = () => {
    setNewMessageLoading(true)
    const text = prompt("Your message")
    const from = prompt("Your name, you can also leave this empty")

    const coordinates = [currentLocation.lng, currentLocation.lat]

    createMessage({ from, text, coordinates }).then(message => {
      console.log(message)
      alert("Message created")
      setNewMessageLoading(false)
      handleReloadMessages()
    })
  }

  const handleReloadMessages = () => {
    setReloadLoading(true)
    getMessages().then(newMessages => {
      console.log(newMessages)
      setReloadLoading(false)
    })
  }

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
      <Button
        type="primary"
        loading={newMessageLoading}
        style={{ margin: "10px 0" }}
        onClick={handleNewMessage}
      >
        Leave a message
      </Button>
      <Button
        type="default"
        loading={reloadLoading}
        style={{ margin: "10px 0" }}
        onClick={handleReloadMessages}
      >
        Reload messages
      </Button>
    </div>
  )
}

export default Info
