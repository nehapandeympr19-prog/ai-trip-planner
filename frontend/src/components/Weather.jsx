
// import React, { useEffect, useState } from 'react';
// import { getCurrentWeather } from '../utils/weatherAPI';

// function Weather({ city }) {
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     if (!city) return;

//     getCurrentWeather(city).then((data) => {
//       if (data) setWeather(data);
//     });
//   }, [city]);

//   if (!weather) return <p>Loading weather...</p>;

//   return (
//     <div>
//       <h3>Weather in {weather.name}</h3>
//       <p>{weather.weather[0].description}</p>
//       <p>Temperature: {weather.main.temp}°C</p>
//     </div>
//   );
// }

// export default Weather;


// src/components/Weather.jsx







//2)

// import React, { useEffect, useState } from "react";

// function Weather({ city }) {
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     if (!city) return;

//     const fetchWeather = async () => {
//       try {
//         const response = await fetch(
//           `https://wttr.in/${city}?format=%C+%t`
//         );
//         const data = await response.text();
//         setWeather(data);
//       } catch (error) {
//         console.error("Error fetching weather:", error);
//         setWeather("Weather info not available");
//       }
//     };

//     fetchWeather();
//   }, [city]);

//   return (
//     <div className="bg-blue-100 p-3 rounded-xl shadow-md mt-4">
//       <h3 className="text-lg font-semibold">🌤 Weather in {city}</h3>
//       <p>{weather ? weather : "Loading..."}</p>
//     </div>
//   );
// }

// export default Weather;






// import React, { useEffect, useState } from "react";

// function Weather({ city }) {
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!city) return;

//     const fetchWeather = async () => {
//   try {
//     const response = await fetch(
//       `https://wttr.in/${encodeURIComponent(city)}?format=%C+%t`,
//       {
//         headers: {
//           Accept: "text/plain",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch weather data");
//     }

//     const data = await response.text();
//     setWeather(data);
//     setError(null);
//   } catch (err) {
//     console.error("Error fetching weather:", err);
//     setWeather(null);
//     setError("❌ Weather info not available.");
//   }
// };

//     fetchWeather();
//   }, [city]);

//   return (
//     <div className="bg-blue-100 p-3 rounded-xl shadow-md mt-4 text-blue-900">
//       <h3 className="text-lg font-semibold mb-1">🌤️ Weather in {city}</h3>
//       {error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <p>{weather ? weather : "Loading..."}</p>
//       )}
//     </div>
//   );
// }

// export default Weather;






import React, { useEffect, useState } from "react";

function Weather({ city }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/weather/${encodeURIComponent(city)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather");
        }

        const data = await response.json();

        setWeather(data.weather);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setWeather(null);
        setError("❌ Weather info not available.");
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="bg-blue-100 p-3 rounded-xl shadow-md mt-4 text-blue-900">
      <h3 className="text-lg font-semibold mb-1">
        🌤️ Weather in {city}
      </h3>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p className="text-lg">
          {weather ? weather : "Loading..."}
        </p>
      )}
    </div>
  );
}

export default Weather;