import React, { useState, useEffect, useRef } from 'react';
import hospitalIconUrl from '../../images/hospital.png'; // Import the PNG image

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
      const initMap = async () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 16,
          streetViewControl: false,
        });

        const panorama = new window.google.maps.StreetViewPanorama(panoRef.current);
        const infowindow = new window.google.maps.InfoWindow(); // Create InfoWindow instance

        const sv = new window.google.maps.StreetViewService();
        sv.getPanorama({ location: userLocation, radius: 50 }).then(({ data }) => {
          const location = data.location;
          const marker = new window.google.maps.Marker({
            position: location.latLng,
            map,
            title: location.description,
            icon: {
              url: hospitalIconUrl, // Use the imported image URL
              scaledSize: new window.google.maps.Size(32, 32), // Resize the image
            },
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
                icon: {
                  url: hospitalIconUrl, // Use the imported image URL
                  scaledSize: new window.google.maps.Size(32, 32), // Resize the image
                },
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

        map.addListener('zoom_changed', () => {
          const zoom = map.getZoom();
          const radius = Math.pow(2, 21 - zoom); // Adjust radius dynamically
          userCircle.setRadius(radius);
        });

        const placesService = new window.google.maps.places.PlacesService(map);
        const request = {
          location: userLocation,
          radius: 5000,
          type: ['hospital'], // Change this to desired place type
        };

        placesService.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) => {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
                icon: {
                  url: hospitalIconUrl, // Use the imported image URL
                  scaledSize: new window.google.maps.Size(32, 32), // Resize the image
                },
              });

              marker.addListener('click', () => {
                // Get place details
                placesService.getDetails({ placeId: place.place_id }, (placeDetails, status) => {
                  if (status === window.google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                    const content = document.createElement("div");
                    const nameElement = document.createElement("h2");
                    nameElement.textContent = placeDetails.name;
                    content.appendChild(nameElement);

                    const placeIdElement = document.createElement("p");
                    placeIdElement.textContent = placeDetails.place_id;
                    content.appendChild(placeIdElement);

                    const placeAddressElement = document.createElement("p");
                    placeAddressElement.textContent = placeDetails.formatted_address;
                    content.appendChild(placeAddressElement);

                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                  } else {
                    console.error("Failed to get place details: ", status);
                  }
                });

                sv.getPanorama({ location: place.geometry.location, radius: 50 })
                  .then(({ data }) => {
                    const location = data.location;
                    panorama.setPano(location.pano);
                    panorama.setPov({
                      heading: 270,
                      pitch: 0,
                    });
                    panorama.setVisible(true);
                  })
                  .catch((e) => console.error("Street View data not found for this location."));
              });
            });
          } else {
            console.error('Places search failed: ', status);
          }
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
        <div id="map" style={mapContainerStyle} ref={mapRef}></div>
        <div id="pano" style={panoContainerStyle} ref={panoRef}></div>
        {mapError && <div className="text-red-500 mt-2">{mapError}</div>}
      </div>
    </div>
  );
}

export default MapModule;
