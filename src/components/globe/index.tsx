import React, { useState, useEffect, useRef } from "react";
import countryData from "../../utils/countriesgeojson.json";
import Globe, { GlobeMethods } from "react-globe.gl";
import "./globe.css";

interface country {
  properties: {
    ISO_A2: string;
  };
}
interface globeRef {
  pointOfView: (mapCenter: {}, transitionDuration: number) => void;
}

interface props {
  country: string;
  population: number;
  coordinates: number[];
  iso2: string;
  width: number;
  height: number;
}

interface IMapCenter {
  lat: number;
  lng: number;
  altitude: number;
}

function GlobeComponent(props: props) {
  const globeEl = useRef<GlobeMethods>();
  const [countries, setCountries] = useState<any>(countryData);
  const [mapCenter, setMapCenter] = useState<IMapCenter>({
    lat: props.coordinates[0],
    lng: props.coordinates[1],
    altitude: 1.5,
  });

  const altitude: number = 0.1;
  const transitionDuration: number = 4000;

  const handleClick = () => {
    if (globeEl.current) {
      globeEl.current.pointOfView(mapCenter, transitionDuration);
    }
  };

  useEffect(() => {
    // load data
    if (globeEl.current) {
      globeEl.current.pointOfView(mapCenter, transitionDuration);
    }
  }, [mapCenter, altitude, props.coordinates]);

  return (
    <div className="globe mx-auto">
      <Globe
        ref={globeEl}
        polygonAltitude={altitude}
        polygonsTransitionDuration={transitionDuration}
        polygonsData={countries.features.filter((d: country) => {
          return d.properties.ISO_A2 === props.iso2;
        })}
        polygonCapColor={() => "rgba(255, 255, 255, 0.7)"}
        polygonSideColor={() => "rgba(255, 255, 255, 0.15)"}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        animateIn={false}
        showAtmosphere={false}
        // during the day have the globe not night but otherwise night mode
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        arcStartLat={43}
        arcStartLng={43}
        width={props.width}
        height={props.height}
        onPolygonClick={handleClick}
      />
    </div>
  );
}

export default GlobeComponent;
