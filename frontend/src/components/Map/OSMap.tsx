// import data from './dummydata'
// import React, { useEffect, useRef } from "react";
// import "leaflet/dist/leaflet.css";
// import { ScrollArea } from "../ui/scroll-area";

// let L: any;
// if (typeof window !== "undefined") {
//   L = require("leaflet");
//   require("leaflet.heat/dist/leaflet-heat.js");
// }

// const generateRandomData = (numPoints: number): { lat: number; lng: number; pm: number }[] => {
//   const data = [];
//   for (let i = 0; i < numPoints; i++) {
//     const lat = 27.695273 + (Math.random() - 0.5) * 0.2; // Random latitude around 27.695273
//     const lng = 85.272083 + (Math.random() - 0.5) * 0.2; // Random longitude around 85.272083
//     const pm = Math.round(Math.random() * 100); // Random PM2.5 value between 0 and 100
//     data.push({ lat, lng, pm });
//   }
//   return data;
// };

// const generateData = (aqiData: { lat: number; lng: number; pm: number }[]) => {
//   return aqiData.map((data) => {
//     const { lat, lng, pm } = data;
//     const temp = Math.random() * 40; // Generate random temperature value
//     const hum = Math.random(); // Generate random humidity value
//     const time = new Date(); // Current time
//     return { lat, lng, pm, temp, hum, time };
//   });
// };

// const aqiData = generateRandomData(40);
// const addressPoints = generateData(aqiData);

// const HeatMap: React.FC = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (L && !mapRef.current) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           if (!mapRef.current) {
//             const { latitude, longitude } = position.coords;
//             mapRef.current = L.map("map").setView([latitude, longitude], 19);

//             const osm = L.tileLayer(
//               "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//               {
//                 attribution:
//                   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//               }
//             );
//             osm.addTo(mapRef.current);

//             const cycleMap = L.tileLayer(
//               "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {
//                 attribution: '&copy; OpenCycleMap, OpenStreetMap contributors',
//               }
//             );
//             cycleMap.addTo(mapRef.current);

//             const goodPoints = addressPoints
//               .filter((p) => p.pm <= 50)
//               .map((p) => [p.lat, p.lng, p.pm]);
//             const moderatePoints = addressPoints
//               .filter((p) => p.pm > 50 && p.pm <= 100)
//               .map((p) => [p.lat, p.lng, p.pm]);
//             const unhealthyPoints = addressPoints
//               .filter((p) => p.pm > 100)
//               .map((p) => [p.lat, p.lng, p.pm]);

//             const goodHeat = L.heatLayer(goodPoints, {
//               gradient: { 0.4: "green" },
//               radius: 25,
//             }).addTo(mapRef.current);
//             const moderateHeat = L.heatLayer(moderatePoints, {
//               gradient: { 0.4: "orange" },
//               radius: 25,
//             }).addTo(mapRef.current);
//             const unhealthyHeat = L.heatLayer(unhealthyPoints, {
//               gradient: { 0.4: "red" },
//               radius: 25,
//             }).addTo(mapRef.current);
//           }
//         });
//       }
//     }

//     return () => {
//       if (mapRef.current) {
//         (mapRef.current as L.Map).remove();
//       }
//     };
//   }, []);

//   return (
//     <ScrollArea className="min-h-full">
//       <div id="map" style={{ height: "100vh", width: "100%" }} />
//     </ScrollArea>
//   );
// };

// export default HeatMap;

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import data from "./dummydata"; // Assuming your dummy data is imported from './dummydata'

const PathMap: React.FC = () => {
  const mapRef = useRef<L.Map | any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Leaflet map on component mount
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [27.695297, 85.271747],
        zoom: 15,
        zoomControl: false, // Disable zoom control to prevent manual zooming
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      // Cleanup function to remove map and clear interval
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateMap = () => {
      const currentPoint = data[currentIndex];
      if (!currentPoint || !currentPoint.position) {
        console.error('Current point or current point.position is undefined', { currentPoint, currentIndex });
        return;
      }

      const coordinates: [number, number] = [currentPoint.position.lati, currentPoint.position.lngi];

      // Add a new polyline segment with the current and previous coordinates
      if (currentIndex > 0) {
        const previousPoint = data[currentIndex - 1];
        const prevCoordinates: [number, number] = [previousPoint.position.lati, previousPoint.position.lngi];

        const avgPMValue = calculateAveragePM(previousPoint.value, currentPoint.value);
        const color = getColorBasedOnPM(avgPMValue);

        L.polyline([prevCoordinates, coordinates], {
          color: color,
          weight: 5,
          opacity: 0.7,
        }).addTo(mapRef.current);
      }

      // Add a marker at the current coordinates
      const marker = L.circleMarker(coordinates, {
        radius: 5,
        color: getColorBasedOnPM(currentPoint.value),
      }).addTo(mapRef.current);

      // Bind tooltip to the marker showing PM2.5 value
      marker.bindTooltip(`PM2.5: ${currentPoint.value}`).openTooltip();

      // Fit map view to the bounds of all markers only once on initial load
      if (currentIndex === 0) {
        mapRef.current.fitBounds(L.featureGroup([marker]).getBounds());
      }
    };

    // Call updateMap initially and on currentIndex change
    updateMap();

    // Set interval to increment currentIndex every 10 seconds
    if (currentIndex < data.length - 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 10000);
    }

    // Cleanup function to clear interval on component unmount or currentIndex exceeds data length
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);

  const calculateAveragePM = (pmStart: number, pmEnd: number) => {
    // Function to calculate average PM2.5 value between two points
    return (pmStart + pmEnd) / 2;
  };

  const getColorBasedOnPM = (pmValue: number) => {
    // Function to determine color based on PM2.5 value
    if (pmValue <= 50) return "green";
    else if (pmValue <= 100) return "orange";
    else return "red";
  };

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default PathMap;
