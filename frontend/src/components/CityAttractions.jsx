// components/CityAttractions.jsx
import React, { useEffect, useState } from "react";
import { getCityCoords, getNearbyPlaces } from "../utils/nearbyApi";

function CityAttractions({ city }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttractions() {
      if (!city) return;
      setLoading(true);

      try {
        // 1. Get city coordinates
        const coords = await getCityCoords(city);
        if (!coords) {
          console.warn("No coordinates found for city:", city);
          setPlaces([]);
          setLoading(false);
          return;
        }

        // 2. Get nearby places
        const attractions = await getNearbyPlaces(coords.lat, coords.lon);
        setPlaces(attractions);
      } catch (error) {
        console.error("Error fetching attractions:", error);
        setPlaces([]);
      }

      setLoading(false);
    }

    fetchAttractions();
  }, [city]);

  if (loading) return <p>Loading attractions...</p>;

  if (places.length === 0) return <p>No attractions found for {city}.</p>;

  return (
    <div>
      <h2>Top attractions in {city}</h2>
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <strong>{place.name}</strong> – {place.kind}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityAttractions;
