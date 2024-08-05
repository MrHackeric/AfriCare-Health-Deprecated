import React, { useState, useEffect, useRef } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  display: 'inline-block',
};

const panoContainerStyle = {
  width: '100%',
  height: '400px',
  display: 'inline-block',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapModule() {
  const [userLocation, setUserLocation] = useState(center);
  const [mapError, setMapError] = useState(null);
  const mapRef = useRef(null);
  const panoRef = useRef(null);
  const inputRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      setMapError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (!apiKey) {
      setMapError('Google Maps API key is missing.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    const handleScriptLoad = () => {
      const initMap = () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 16,
          streetViewControl: false,
        });

        const panorama = new window.google.maps.StreetViewPanorama(panoRef.current);
        const sv = new window.google.maps.StreetViewService();
        sv.getPanorama({ location: userLocation, radius: 50 }).then(({ data }) => {
          const location = data.location;
          const marker = new window.google.maps.Marker({
            position: location.latLng,
            map,
            title: location.description,
          });

          panorama.setPano(location.pano);
          panorama.setPov({
            heading: 270,
            pitch: 0,
          });
          panorama.setVisible(true);

          marker.addListener("click", () => {
            panorama.setPano(location.pano);
            panorama.setPov({
              heading: 270,
              pitch: 0,
            });
            panorama.setVisible(true);
          });
        });

        map.addListener("click", (event) => {
          sv.getPanorama({ location: event.latLng, radius: 50 })
            .then(({ data }) => {
              const location = data.location;
              const marker = new window.google.maps.Marker({
                position: location.latLng,
                map,
                title: location.description,
              });

              panorama.setPano(location.pano);
              panorama.setPov({
                heading: 270,
                pitch: 0,
              });
              panorama.setVisible(true);

              marker.addListener("click", () => {
                panorama.setPano(location.pano);
                panorama.setPov({
                  heading: 270,
                  pitch: 0,
                });
                panorama.setVisible(true);
              });
            })
            .catch((e) => console.error("Street View data not found for this location."));
        });
        // Create the search box and link it to the UI element.
        const input = inputRef.current;
        const searchBox = new window.google.maps.places.SearchBox(input);
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", () => {
          searchBox.setBounds(map.getBounds());
        });

        // Add a marker for the user's location with a blue dot and a blue outline
        const userLocationMarker = new window.google.maps.Marker({
          position: userLocation,
          map,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 5, // Adjust size as needed
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#4285F4',
            strokeWeight: 2, // Adjust stroke width as needed
          },
        });

        const userCircle = new window.google.maps.Circle({
          strokeColor: '#4285F4',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#4285F4',
          fillOpacity: 0.35,
          map,
          center: userLocation,
          radius: 40, // Initial radius
        });

        // Adjust circle radius based on zoom level
        map.addListener('zoom_changed', () => {
          const zoom = map.getZoom();
          const radius = Math.pow(2, 21 - zoom); // Adjust radius dynamically
          userCircle.setRadius(radius);
        });
      };

      if (window.google && window.google.maps) {
        initMap();
      } else {
        window.initMap = initMap;
      }
    };

    script.addEventListener('load', handleScriptLoad);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
    };
  }, [apiKey, userLocation]);

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl h-full">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Map</h2>
      </header>
      <div className="p-3 h-full relative">
        <input
          id="pac-input"
          className="controls mb-2 md:mb-0 md:mr-2"
          type="text"
          placeholder="Search nearby Health Facilities..."
          ref={inputRef}
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '300px',
            marginTop: '55px',
            marginRight: '55px',
            height: '40px',
            padding: '0 12px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipsis',
            zIndex: '5',
          }}
        />
        <div id="map" style={mapContainerStyle} ref={mapRef}></div>
        <div id="pano" style={panoContainerStyle} ref={panoRef}></div>
        {mapError && <div className="text-red-500 mt-2">{mapError}</div>}
      </div>
    </div>
  );
}

export default MapModule;
