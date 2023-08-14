import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;
const MapBox = () => {
   const mapContainer = useRef(null);
   const map = useRef(null);
   const [lng, setLng] = useState(108.22);
   const [lat, setLat] = useState(16.054);
   const [zoom, setZoom] = useState(15);
   useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
         container: mapContainer.current,
         style: 'mapbox://styles/kdoan87720/cll9fyvk300p401pmc57u9512',
         center: [lng, lat],
         zoom: zoom,
      });
      map.current.on('move', () => {
         setLng(map.current.getCenter().lng.toFixed(4));
         setLat(map.current.getCenter().lat.toFixed(4));
         setZoom(map.current.getZoom().toFixed(2));
      });
   });

   return (
      <div className='relative'>
         <div
            ref={mapContainer}
            className='map-container'
         />
      </div>
   );
};

export default MapBox;
