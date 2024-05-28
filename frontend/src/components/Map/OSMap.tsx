// "use client"
// import React, { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';

// let L:any;
// if (typeof window !== 'undefined') {
//   L = require('leaflet');
//   require('leaflet.heat/dist/leaflet-heat.js');
// }

// // Function to generate dummy data
// const generateData = (lat: number, lng: number, count: number) => {
//   const data = [];
//   for (let i = 0; i < count; i++) {
//     const latOffset = (Math.random() - 0.5) * 0.0009;
//     const lngOffset = (Math.random() - 0.5) * 0.0009;
//     const pm = Math.random() * 100; // Generate random pm2.5 value
//     const temp = Math.random() * 40; // Generate random temperature value
//     const hum = Math.random(); // Generate random humidity value
//     const time = new Date(); // Current time
//     data.push({ lat: lat + latOffset, lng: lng + lngOffset, pm, temp, hum, time });
//   }
//   return data;
// };

// const addressPoints = generateData(27.695273, 85.272083, 1000); // Generate 1000 data points

// const HeatMap: React.FC = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (L && !mapRef.current) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           if (!mapRef.current) {
//             const { latitude, longitude } = position.coords;
//             mapRef.current = L.map('map').setView([latitude, longitude], 19);

//             const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//               attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//             });
//             osm.addTo(mapRef.current);

//             const points = addressPoints.map((p) => [p.lat, p.lng, (p.pm + p.temp + p.hum) / 3]); // Average pm, temp, and hum for intensity
//             const heat = L.heatLayer(points, { radius: 25 }).addTo(mapRef.current);
//           }
//         });
//       }
//     }

//     // Cleanup function
//     return () => {
//       if (mapRef.current) {
//         (mapRef.current as L.Map).remove();
//       }
//     };
//   }, []);

//   return (
//     <div id="map" style={{ height: '100vh', width: '100%' }} />
//   );
// };

// export default HeatMap

// "use client"
// import React, { useEffect, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';

// let L:any;
// if (typeof window !== 'undefined') {
//   L = require('leaflet');
//   require('leaflet.heat/dist/leaflet-heat.js');
// }

// // Function to generate data from air quality index
// const generateData = (aqiData: { lat: number, lng: number, pm: number }[]) => {
//   return aqiData.map(data => {
//     const { lat, lng, pm } = data;
//     const temp = Math.random() * 40; // Generate random temperature value
//     const hum = Math.random(); // Generate random humidity value
//     const time = new Date(); // Current time
//     return { lat, lng, pm, temp, hum, time };
//   });
// };

// // Your custom air quality index data
// const aqiData = [
//   { lat: 27.695273, lng: 85.272083, pm: 50 },
//   { lat: 27.696273, lng: 85.273083, pm: 55 },
//   { lat: 27.697273, lng: 85.274083, pm: 60 },
//   { lat: 27.698273, lng: 85.275083, pm: 65 },
//   { lat: 27.699273, lng: 85.276083, pm: 70 },
//   // Add more data points here
// ];

// const addressPoints = generateData(aqiData);

// const mapRef = useRef(null);

// useEffect(() => {
//   if (L && !mapRef.current) {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         if (!mapRef.current) {
//           const { latitude, longitude } = position.coords;
//           mapRef.current = L.map('map').setView([latitude, longitude], 19);

//           const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//           });
//           osm.addTo(mapRef.current);

//           const points = addressPoints.map((p) => [p.lat, p.lng, (p.pm + p.temp + p.hum) / 3]); // Average pm, temp, and hum for intensity
//           const heat = L.heatLayer(points, { radius: 25 }).addTo(mapRef.current);
//         }
//       });
//     }
//   }

//   // Cleanup function
// }, []);

// const HeatMap: React.FC = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (L && !mapRef.current) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           if (!mapRef.current) {
//             const { latitude, longitude } = position.coords;
//             mapRef.current = L.map('map').setView([latitude, longitude], 19);

//             const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//               attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//             });
//             osm.addTo(mapRef.current);

//             const points = addressPoints.map((p) => [p.lat, p.lng, (p.pm + p.temp + p.hum) / 3]); // Average pm, temp, and hum for intensity
//             const heat = L.heatLayer(points, { radius: 25 }).addTo(mapRef.current);
//           }
//         });
//       }
//     }

//     // Cleanup function
//     return () => {
//       if (mapRef.current) {
//         (mapRef.current as L.Map).remove();
//       }
//     };
//   }, []);

//   return (
//     <div id="map" style={{ height: '100vh', width: '100%' }} />
//   );
// };

// export default HeatMap

"use client"

import React, { useEffect, useRef } from "react"

import "leaflet/dist/leaflet.css"

import { ScrollArea } from "../ui/scroll-area"

let L: any
if (typeof window !== "undefined") {
  L = require("leaflet")
  require("leaflet.heat/dist/leaflet-heat.js")
}

// Function to generate data from air quality index
const generateData = (aqiData: { lat: number; lng: number; pm: number }[]) => {
  return aqiData.map((data) => {
    const { lat, lng, pm } = data
    const temp = Math.random() * 40 // Generate random temperature value
    const hum = Math.random() // Generate random humidity value
    const time = new Date() // Current time
    return { lat, lng, pm, temp, hum, time }
  })
}

// Your custom air quality index data
const aqiData = [
  { lat: 27.695273, lng: 85.272083, pm: 10 },
  { lat: 27.696273, lng: 85.273083, pm: 55 },
  { lat: 27.697273, lng: 85.274083, pm: 60 },
  { lat: 27.698273, lng: 85.275083, pm: 65 },
  { lat: 27.699273, lng: 85.276083, pm: 110 },
  // Add more data points here
]

const addressPoints = generateData(aqiData)
const HeatMap: React.FC = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    if (L && !mapRef.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (!mapRef.current) {
            const { latitude, longitude } = position.coords
            mapRef.current = L.map("map").setView([latitude, longitude], 19)

            const osm = L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              {
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              }
            )
            osm.addTo(mapRef.current)

            const goodPoints = addressPoints
              .filter((p) => p.pm <= 50)
              .map((p) => [p.lat, p.lng, p.pm])
            const moderatePoints = addressPoints
              .filter((p) => p.pm > 50 && p.pm <= 100)
              .map((p) => [p.lat, p.lng, p.pm])
            const unhealthyPoints = addressPoints
              .filter((p) => p.pm > 100)
              .map((p) => [p.lat, p.lng, p.pm])

            const goodHeat = L.heatLayer(goodPoints, {
              gradient: { 0.4: "green" },
              radius: 25,
            }).addTo(mapRef.current)
            const moderateHeat = L.heatLayer(moderatePoints, {
              gradient: { 0.4: "orange" },
              radius: 25,
            }).addTo(mapRef.current)
            const unhealthyHeat = L.heatLayer(unhealthyPoints, {
              gradient: { 0.4: "red" },
              radius: 25,
            }).addTo(mapRef.current)
          }
        })
      }
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        ;(mapRef.current as L.Map).remove()
      }
    }
  }, [])

  return (
    <ScrollArea className="min-h-full">
      <div id="map" style={{ height: "100vh", width: "100%", zIndex:"-10" }} />
    </ScrollArea>
  )
}

export default HeatMap
