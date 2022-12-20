import React, { useState, useEffect, useContext, SetStateAction } from "react";
import { useQuery } from "react-query";
import fetchCountryData from "../../utils/axios";
import countryList from "../../utils/countryList";
import GlobeComponent from "../globe";
import Loading from "../loading";
import ScoreDisplay from "../scoreDisplay";
import gameContext from "../../contexts/gameContext";
import "./game.css";

import Globe from "react-globe.gl";
import { SizeMe } from "react-sizeme";

const strict = 0.4;

const Game = () => {
  const [input, setInput] = useState<string>("");
  const [width, setWidth] = useState(0);
  // const [population, setPopulation] = useState<number>(20);
  // const [iso2, setIso2] = useState<string>("")
  // const [coordinates, setCoordinates] = useState<number[]>([])

  const { country, score, setScore } = useContext(gameContext)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [country],
    queryFn: () => fetchCountryData(country),
    // onSuccess: (data): void => {
    //     console.log("success")
    //     setPopulation(data.info[0].population / 1000);
    //     setIso2(data.info[0].iso2)
    //     setCoordinates(data.coord)
    // },
    staleTime: 100000000000,
  });

  const checkGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSuccess) {
      console.log("check");
      const calculatedScore: number = calculateScore(parseInt(input));
      setScore(calculatedScore);
    }
  };

  const calculateScore = (guess: number): number => {
    // wow, look at this
    const correctAnswer = data?.info[0].population / 1000;
    
    const result: number =
      100 *
      Math.E **
        (-((10 * strict ** 2) / correctAnswer ** 0.1) *
          (Math.log(correctAnswer) - Math.log(guess)) ** 2);
    console.log(guess, result)
    return parseInt(result.toFixed(2));
  };

  const parent = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent.current) {
      setWidth(parent?.current.offsetWidth);
    }
  }, []);

  return (
    <div className="game border-2 z-0" ref={parent}>
      <div>
        <h2>{country}</h2>
        {isError && <p>error</p>}
        {isLoading ? <Loading /> : null}
      </div>
      <SizeMe>
        {({ size }) => (
          <div>
            {data && size.width ? (
              <div className="game-container flex mx-auto flex-col lg:flex-row static">
                <div className="flex-1">
                  <GlobeComponent
                    width={size.width}
                    height={size.width / (4 / 3)}
                    country={country}
                    iso2={data.info[0].iso2}
                    population={data.info[0].population}
                    coordinates={data.coord}
                  />
                </div>
                <div className="flex-1 flex content-center justify-center md:absolute">
                  {score >= 0 ? (
                    <ScoreDisplay score={score} />
                  ) : (
                    <form className="bg-gray-200 p-6 " onSubmit={checkGuess}>
                      <h1 className="text-3xl leading-9 tracking-tight my-5">
                        GeoPopper
                      </h1>
                      <input
                        value={input}
                        onChange={handleInputChange}
                        type="text"
                        className="p-2 shadow-sm border-gray-300 rounded-lg m-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                        placeholder="Guess here! (in millions)"
                      ></input>
                      <button
                        type="submit"
                        className="bg-indigo-500 font-bold rounded-full py-3 px-8 shadow-lg uppercase tracking-wider text-white focus:outline-none"
                      >
                        Submit Guess
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </SizeMe>
    </div>
  );
};

export default Game;
