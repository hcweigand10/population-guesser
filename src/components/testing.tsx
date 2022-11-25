// import React, { useState, useEffect } from "react";
// import fetchCountryData from "./utils/axios";
// import { useQuery } from "react-query";
// import "./App.css";
// import { countryList } from "./utils/countries";

// import DeckGL from '@deck.gl/react/typed';
// import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers/typed';

// const strict = 0.3;

// function App() {
//   const [country, setCountry] = useState<string>();
//   const [input, setInput] = useState<string>("");
//   const [answer, setAnswer] = useState<number>(20);
//   const [showScore, setShowScore] = useState<boolean>(false);
//   const [score, setScore] = useState<number>();

//   useEffect(() => {
//     setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
//     // setCountry("United Arab Emirates")
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   const checkGuess = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isSuccess) {
//       setScore(getScore());
//       setShowScore(true);
//     }
//   };

//   const { data, isLoading, isSuccess, isError, error } = useQuery({
//     queryKey: [country || ""],
//     queryFn: () => fetchCountryData(country || ""),
//     onSuccess: (data): void => setAnswer(data[0].population / 1000),
//   });

//   const getScore = () => {
//     const guess: number = parseFloat(input);
//     console.log(guess, answer);
//     // wow, look at this
//     const result: number =
//       100 *
//       Math.E **
//         (-((10 * strict ** 2) / answer ** 0.1) *
//           (Math.log(answer) - Math.log(guess)) ** 2);
//     return result;
//   };

//   // source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
//   const COUNTRIES =
//     "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson"; //eslint-disable-line
//   const AIR_PORTS =
//     "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

//   const INITIAL_VIEW_STATE = {
//     latitude: 51.47,
//     longitude: 0.45,
//     zoom: 4,
//     bearing: 0,
//     pitch: 30,
//   };

//   const onClick = (info) => {
//     console.log('hello', info);
//     if (info.object) {
//       // eslint-disable-next-line
//       alert(
//         `${info.object.properties.name} (${info.object.properties.abbrev})`
//       );
//     }
//   };

//   return (
//     <div className="App">
//       <h2>{country}</h2>
//       {isError && <p>error</p>}
//       {isLoading ? <p>Loading...</p> : <p>data recieved</p>}
//       {isSuccess && data.length > 0 && (
//         <div>
//           <p>Population: {data[0].population / 1000}M</p>
//           <form onSubmit={checkGuess}>
//             <input
//               placeholder="Guess here!"
//               onChange={handleInputChange}
//             ></input>
//             <button type="submit">Submit Guess</button>
//           </form>
//         </div>
//       )}

//       {showScore && score && (
//         <p>Your Score is: {score.toLocaleString("en-US")}!</p>
//       )}
//       <div className="world">
//         <DeckGL controller={true} initialViewState={INITIAL_VIEW_STATE}>
//           <GeoJsonLayer
//             id="base-map"
//             data={COUNTRIES}
//             stroked={true}
//             filled={true}
//             lineWidthMinPixels={2}
//             opacity={0.4}
//             getLineColor={[60, 60, 60]}
//             getFillColor={[200, 200, 200]}
//           />
//           <GeoJsonLayer
//             id="airports"
//             data={AIR_PORTS}
//             filled={true}
//             pointRadiusMinPixels={2}
//             pointRadiusScale={2000}
//             // getPointRadius={f => 11 - f.properties.scalerank}
//             getFillColor={[200, 0, 80, 180]}
//             pickable={true}
//             autoHighlight={true}
//             onClick={onClick}
//           />
//           <ArcLayer
//             id="arcs"
//             data={AIR_PORTS}
//             dataTransform={d => d.features.filter(f => f.properties.scalerank < 4)}
//             getSourcePosition={f => [-0.4531566, 51.4709959]}
//             getTargetPosition={f => f.geometry.coordinates}
//             getSourceColor={[0, 128, 200]}
//             getTargetColor={[200, 0, 80]}
//             getWidth={1}
//           />
//         </DeckGL>
//       </div>
//     </div>
//   );
// }

// export default App;
import React from 'react'

const testing = () => {
  return (
    <div>
      
    </div>
  )
}

export default testing
