import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"
import Info from "../components/info"

import { getMessages } from "../data"

const GOOGLE_API_KEY = process.env.GATSBY_GOOGLE_MAPS_API_KEY

const IndexPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [messages, setMessages] = useState([])

  const loadMessages = async () => {
    return getMessages().then(setMessages)
  }

  useEffect(() => {
    let watcher
    loadMessages()

    if (navigator.geolocation) {
      // 🗺️ yep, we can proceed!
      watcher = navigator.geolocation.watchPosition(position => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    } else {
      // no can do
    }

    return () => {
      navigator.geolocation.clearWatch(watcher)
    }
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <Info
        currentLocation={currentLocation}
        messages={messages}
        loadMessages={loadMessages}
      />
      <Map
        currentLocation={currentLocation}
        messages={messages}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: "100%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Layout>
  )
}

export default IndexPage
