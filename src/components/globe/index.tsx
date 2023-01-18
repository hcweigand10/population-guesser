import React, { useState, useEffect, useRef } from "react";
import countryData from "../../utils/countriesgeojson.json";
import Globe, { GlobeMethods } from "react-globe.gl";
import "./globe.css";
import moment from "moment";
var SunCalc = require("suncalc");

interface country {
  properties: {
    ISO_A2: string;
    ISO_A2_EH?: string;
  };
}
interface globeRef {
  pointOfView: (mapCenter: {}, transitionDuration: number) => void;
}

interface props {
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
  const [isDay, setIsDay] = useState<boolean>(false);
  const globeEl = useRef<GlobeMethods>();
  const [countries, setCountries] = useState<any>(countryData);
  const [mapCenter, setMapCenter] = useState<IMapCenter>({
    lat: props.coordinates[0],
    lng: props.coordinates[1],
    altitude: 2,
  });

  const altitude: number = 0.2;
  const transitionDuration: number = 4000;

  const handleClick = () => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ ...mapCenter, altitude: 1 }, 2000);
    }
  };

  useEffect(() => {
    // load data
    if (globeEl.current) {
      globeEl.current.pointOfView(mapCenter, transitionDuration);
    }
  }, [mapCenter, altitude, props.coordinates]);

  useEffect(() => {
    const getSunData = async () => {
      // get sunrise and sun set of current location
      navigator.geolocation.getCurrentPosition(async (position) => {
        const times = SunCalc.getTimes(
          new Date(),
          position.coords.latitude,
          position.coords.longitude
        );
        // basically check if the time is between sunrise and sunset, otherwise its night

        // gets format 03:51:37
        const sunset = times.sunset.toString().split(" ")[4];
        const sunrise = times.sunrise.toString().split(" ")[4];

        // first compare the hours, if the hours match then compare the minutes
        const currentTime = moment().format("HH:mm");
        if (
          currentTime.split(":")[0] >= sunrise.split(":")[0] &&
          currentTime.split(":")[0] <= sunset.split(":")[0]
        ) {
          console.log(true, "running is day")
          setIsDay(true);
        }
      });
    };
    getSunData();
  },[])

  return (
    <div className="globe mx-auto">
      <Globe
        ref={globeEl}
        polygonAltitude={altitude}
        polygonsTransitionDuration={transitionDuration}
        polygonsData={countries.features.filter((d: country) => {
          return (
            d.properties.ISO_A2 === props.iso2 ||
            d.properties.ISO_A2_EH === props.iso2
          );
        })}
        polygonCapColor={() => "rgba(255, 255, 255, 0.7)"}
        polygonSideColor={() => "rgba(255, 255, 255, 0.15)"}
        // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)"
        animateIn={false}
        showAtmosphere={true}
        // during the day have the globe not night but otherwise night mode
        globeImageUrl={
          isDay
            ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            : "//unpkg.com/three-globe/example/img/earth-night.jpg"
        }
        arcStartLat={42}
        arcStartLng={42}
        width={props.width}
        height={props.height}
        onPolygonClick={handleClick}
      />
    </div>
  );
}

export default GlobeComponent;
