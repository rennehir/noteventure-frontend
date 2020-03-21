import React from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"

import Layout from "../components/layout"
import SEO from "../components/seo"

const GOOGLE_API_KEY = ""

const Map = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  ))
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ flex: "1" }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </Layout>
)

export default IndexPage
