import React, { useState, useEffect, useRef } from "react";
import fetchCountryData from "../../utils/axios";
import { useQuery } from "react-query";
import countryList from "../../utils/countryList";
import countryData from "../../utils/countriesgeojson.json";
import Globe from "react-globe.gl";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";


const strict = 0.3;

interface country {
  properties: {
    ISO_A2: string;
  };
}
interface globeRef {
  current: {
    pointOfView: () => void
  }
}

function GlobeComponent() {
  const globeEl = useRef<globeRef>();
  const [country, setCountry] = useState<string>();
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<number>(20);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>();
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number, altitude: number}>({lat: 0, lng: 0, altitude: 2});

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
    onSuccess: (response): void => {
      const{data, coord} = response;
      console.log(response);
      setCountryCode(data[0].iso2);
      setAnswer(data[0].population / 1000);
      setMapCenter({lat: coord[0], lng: coord[1], altitude: Math.max(0.4, Math.sqrt(data[0].population /1000) * 0.2)});
      return data;
    },
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

  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [countries, setCountries] = useState<any>(countryData);
  const [altitude, setAltitude] = useState<number>(0.1);
  const [transitionDuration, setTransitionDuration] = useState<number>(1000);

  useEffect(() => {
    // load data
    setTimeout(() => {
      setTransitionDuration(4000);
      setAltitude(() => Math.max(0.1, Math.sqrt(answer) * 7e-5));
    }, 3000);
    globeEl.current.pointOfView(mapCenter, 4000);
  }, [mapCenter]);

  return (
    <div>
      <h2>{country}</h2>
      {isError && <p>error</p>}
      {isLoading ? <p>Loading...</p> : <p>data recieved</p>}
      {isSuccess && data.data.length > 0 && (
        <div>
          <p>Population: {data.data[0].population / 1000}M</p>
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

      {/* react globe.gl */}
      <div className="world">
        <Globe
          ref={globeEl}
          polygonAltitude={altitude}
          polygonsTransitionDuration={transitionDuration}
          polygonsData={countries.features.filter(
            (d: country) => {
              return d.properties.ISO_A2 === countryCode}
          )}
          polygonCapColor={() => "rgba(255, 255, 255, 0.7)"}
          polygonSideColor={() => "rgba(255, 255, 255, 0.15)"}
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          animateIn={true}
          showAtmosphere={true}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        />
      </div>
    </div>
  );
}

export default GlobeComponent;
