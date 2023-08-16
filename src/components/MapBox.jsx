import React, { useState, useEffect } from 'react';
import ReactMapGL, {
   FullscreenControl,
   GeolocateControl,
   Marker,
   Source,
   Layer,
   NavigationControl,
} from 'react-map-gl';
const MapBox = ({ order_in_progress }) => {
   const [start, setStart] = useState([108.217584, 16.052375]);
   const [coords, setCoords] = useState([]);
   const [viewState, setViewState] = useState({
      longitude: 108.217584,
      latitude: 16.052375,
      zoom: 14,
   });
   useEffect(() => {
      if ('geolocation' in navigator) {
         navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setStart([longitude, latitude]);
         });
      }
      getRoute();
   }, [start[0], start[1]]);
   const geojson = {
      type: 'FeatureCollection',
      features: [
         {
            type: 'feature',
            geometry: {
               type: 'LineString',
               coordinates: coords,
            },
         },
      ],
   };

   const lineStyle = {
      id: 'roadLayer',
      type: 'line',
      layout: {
         'line-join': 'round',
         'line-cap': 'round',
      },
      paint: {
         'line-color': '#ffb4b4',
         'line-width': 4,
         'line-opacity': 0.9,
      },
   };

   const getRoute = async () => {
      const response = await fetch(
         `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${
            start[1]
         };${order_in_progress.long},${
            order_in_progress.lat
         }?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${
            import.meta.env.VITE_MAP_BOX_TOKEN
         }`,
         { method: 'GET' }
      );
      const data = await response.json();
      const coordinatesList = data.routes[0].geometry.coordinates;
      setCoords(coordinatesList);
   };

   return (
      <div className='h-[400px] w-full'>
         <ReactMapGL
            {...viewState}
            mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
            style={{ width: '100%', height: '100%' }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            onMove={(evt) => setViewState(evt.viewState)}
         >
            <Source
               id='endSource'
               type='geojson'
               data={geojson}
            >
               <Layer {...lineStyle} />
            </Source>
            <GeolocateControl trackUserLocation={'true'} />
            <FullscreenControl />
            <NavigationControl />
            <Marker
               color='green'
               longitude={start[0]}
               latitude={start[1]}
            />
            <Marker
               color='red'
               longitude={Number(order_in_progress.long)}
               latitude={Number(order_in_progress.lat)}
            />
         </ReactMapGL>
      </div>
   );
};

export default MapBox;
