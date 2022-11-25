import React, { useState, useEffect } from "react";
import fetchCountryData from "./utils/axios";
import { useQuery } from "react-query";
import "./App.css";
import { countryList } from "./utils/countries";
import ReactTooltip from "react-tooltip";

import Globe from "react-globe.gl";

// react simple maps
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const strict = 0.3;

function App() {
  const [country, setCountry] = useState<string>();
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<number>(20);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>();

  useEffect(() => {
    setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
    // setCountry("United Arab Emirates")
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const checkGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSuccess) {
      setScore(getScore());
      setShowScore(true);
    }
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [country || ""],
    queryFn: () => fetchCountryData(country || ""),
    onSuccess: (data): void => setAnswer(data[0].population / 1000),
  });

  const getScore = () => {
    const guess: number = parseFloat(input);
    console.log(guess, answer);
    // wow, look at this
    const result: number =
      100 *
      Math.E **
        (-((10 * strict ** 2) / answer ** 0.1) *
          (Math.log(answer) - Math.log(guess)) ** 2);
    return result;
  };

  const [content, setTooltipContent] = useState("");

  return (
    <div className="App">
      <h2>{country}</h2>
      {isError && <p>error</p>}
      {isLoading ? <p>Loading...</p> : <p>data recieved</p>}
      {isSuccess && data.length > 0 && (
        <div>
          <p>Population: {data[0].population / 1000}M</p>
          <form onSubmit={checkGuess}>
            <input
              placeholder="Guess here!"
              onChange={handleInputChange}
            ></input>
            <button type="submit">Submit Guess</button>
          </form>
        </div>
      )}

      {showScore && score && (
        <p>Your Score is: {score.toLocaleString("en-US")}!</p>
      )}

      {/* react globe */}
      <div className="world">
        <Globe
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          animateIn={true}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        />
      </div>

      {/* basic map */}
      {/* <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return <Geography key={geo.rsmKey} geography={geo} />
          })
        }
      </Geographies>
      <Annotation
        subject={[2.3522, 48.8566]}
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: "#FF5533",
          strokeWidth: 3,
          strokeLinecap: "round"
        }}
      >
        <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
          {"Paris"}
        </text>
      </Annotation>
    </ComposableMap> */}
      <div data-tip="" data-arrow-color={' #fff'} data-background-color={' #fff'} data-text-color={'#000'}>
        <ComposableMap>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      console.log(geo.properties.name);
                      setTooltipContent(`${geo.properties.name}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
