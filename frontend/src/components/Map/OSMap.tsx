"use client"

import React, { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Map } from 'leaflet';

interface Location {
  loaded: boolean;
  error: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface OpenStreetMapProps {
  location: Location;
}

const OSMap: React.FC<OpenStreetMapProps> = ({ location }) => {
  const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
  const ZOOM_LEVEL = 9
  const mapRef = useRef<Map | null>(null);

  return (
    <>
      <div className='container'>
        <div className='container'>
          <h1 className='text-center-mt-5'>OpenStreetMap Embeded</h1>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='container'>
              <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {location.loaded && !location.error && (
                  <Marker
                    position={[
                      location.coordinates.lat,
                      location.coordinates.lng,
                    ]}
                  ></Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OSMap