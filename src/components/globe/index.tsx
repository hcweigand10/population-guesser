import React, { useState, useEffect, useRef } from "react";
import countryData from "../../utils/countriesgeojson.json";
import Globe, {GlobeMethods} from "react-globe.gl";
import "./globe.css"

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";


interface country {
  properties: {
    ISO_A2: string;
  };
}
interface globeRef {
    pointOfView: (mapCenter: {}, transitionDuration: number) => void
}

interface props {
    country: string,
    population: number,
    coordinates: number[],
    iso2: string
}

function GlobeComponent(props: props) {
  const globeEl = useRef<GlobeMethods>();
  const [countries, setCountries] = useState<any>(countryData);

  const altitude: number = 0.1
  const transitionDuration: number = 4000

  const mapCenter = {
      lat: props.coordinates[0],
      lng: props.coordinates[1],
      altitude: 1
  }

  useEffect(() => {
    // load data
    console.log(mapCenter)
    if (globeEl.current) {
        globeEl.current.pointOfView(mapCenter, transitionDuration);
    }
  }, [altitude, props.coordinates]);

  return (
      <div className="globe mx-auto p-5">
        <Globe
          ref={globeEl}
          polygonAltitude={altitude}
          polygonsTransitionDuration={transitionDuration}
          polygonsData={countries.features.filter(
            (d: country) => {
              return d.properties.ISO_A2 === props.iso2}
          )}
          polygonCapColor={() => "rgba(255, 255, 255, 0.7)"}
          polygonSideColor={() => "rgba(255, 255, 255, 0.15)"}
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          animateIn={false}
          showAtmosphere={false}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          width={500}
          height={500}
          arcStartLat={43}
          arcStartLng={43}
        />
      </div>
  );
}

export default GlobeComponent;
