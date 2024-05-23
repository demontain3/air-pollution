"use client"
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

let L:any;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  require('leaflet.heat/dist/leaflet-heat.js');
}

// Function to generate dummy data
const generateData = (lat: number, lng: number, count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.0009;
    const lngOffset = (Math.random() - 0.5) * 0.0009;
    const pm = Math.random() * 100; // Generate random pm2.5 value
    const temp = Math.random() * 40; // Generate random temperature value
    const hum = Math.random(); // Generate random humidity value
    const time = new Date(); // Current time
    data.push({ lat: lat + latOffset, lng: lng + lngOffset, pm, temp, hum, time });
  }
  return data;
};

const addressPoints = generateData(27.695273, 85.272083, 1000); // Generate 1000 data points

const HeatMap: React.FC = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (L && !mapRef.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (!mapRef.current) {
            const { latitude, longitude } = position.coords;
            mapRef.current = L.map('map').setView([latitude, longitude], 19);

            const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            });
            osm.addTo(mapRef.current);

            const points = addressPoints.map((p) => [p.lat, p.lng, (p.pm + p.temp + p.hum) / 3]); // Average pm, temp, and hum for intensity
            const heat = L.heatLayer(points, { radius: 25 }).addTo(mapRef.current);
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        (mapRef.current as L.Map).remove();
      }
    };
  }, []);

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }} />
  );
};

export default HeatMap