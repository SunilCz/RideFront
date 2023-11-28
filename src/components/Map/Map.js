import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iaW4tZGV2a290YSIsImEiOiJjbHBmNDVvd3YxaTJ3MmpwZGxndzNudGE3In0.OSon9cSO6JX4io1wDqcZIQ';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log('New position:', position.coords);
        setViewport({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 15,
        });
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );

    return () => {
      // Cleanup the watchPosition when the component unmounts
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <div style={{ height: '100vh', width: '100vw' }}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(newViewport) => setViewport(newViewport)}
        >
          {userLocation && (
           <Marker latitude={userLocation.latitude} longitude={userLocation.longitude} offsetLeft={-20} offsetTop={-10}>
           <div style={{ color: 'blue', fontWeight: 'bold' }}>Robin</div>
         </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Map;
