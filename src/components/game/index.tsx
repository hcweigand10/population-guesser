import React, { useState, useEffect, useContext, SetStateAction } from "react";
import { useQuery } from "react-query";
import fetchCountryData from "../../utils/axios";
import countryList from "../../utils/countryList";
import GlobeComponent from "../globe";
import Loading from "../loading";
import ScoreDisplay from "../scoreDisplay";
import gameContext from "../../contexts/gameContext";
import "./game.component.scss";
import moment from "moment";

import Globe from "react-globe.gl";
import { SizeMe } from "react-sizeme";
import { useLocation } from "react-router-dom";
const strict = 0.4;

const Game = () => {
  const location = useLocation();
  const [mode, setMode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [width, setWidth] = useState(0);
  // const [population, setPopulation] = useState<number>(20);
  // const [iso2, setIso2] = useState<string>("")
  // const [coordinates, setCoordinates] = useState<number[]>([])

  const { country, setCountry, score, setScore } = useContext(gameContext)


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
    console.log(guess, result);
    return parseInt(result.toFixed(2));
  };

  const parent = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent.current) {
      setWidth(parent?.current.offsetWidth);
    }
    setMode(location.pathname);
    // setCountry("United Arab Emirates")
  }, []);

  const newCountry = () => {
    setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
    setScore(-1);
  };

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
              <div className="game-container flex m-auto flex-col static">
                <div className="flex-1 flex content-center justify-center">
                  {score >= 0 ? (
                    <div className="flex flex-col">
                    <h1 className="text-3xl leading-9 tracking-tight my-5 text-white">
                        {country}
                      </h1>
                    <ScoreDisplay score={score} />
                    {mode === "/practice" ? (
                          <button
                            type="button"
                            className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 my-5 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none"
                            onClick={newCountry}
                          >
                            New Country
                          </button>
                        ) : (
                          <h3>Come back tomorrow for the next country!</h3>
                        )}
                    </div>
                  ) : (
                    <form className=" py-1 " onSubmit={checkGuess}>
                      <h1 className="text-3xl leading-9 tracking-tight my-5 text-white">
                        {country}
                      </h1>
                      <h2>{isLoading && "loading"}</h2>
                      {isError && <p>api error</p>}
                      {isLoading ? <Loading /> : null}
                      <div className="my-5">
                        <input
                          value={input}
                          onChange={handleInputChange}
                          type="text"
                          className="py-3 px-8 shadow-sm border-gray-300 rounded-lg m-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                          placeholder="Guess here! (in millions)"
                        ></input>
                        <div className="flex flex-row gap-3">
                        <button
                          type="submit"
                          className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 my-5 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none"
                        >
                          Submit Guess
                        </button>
                        {mode === "/practice" ? (
                          <button
                            type="button"
                            className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 my-5 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none"
                            onClick={newCountry}
                          >
                            New Country
                          </button>
                        ) : (
                          null
                        )}
                        </div>
                      </div>
                    </form>
                  )}
                </div>
                <div className="flex-1">
                  <GlobeComponent
                    width={size.width}
                    height={size.width / (4 / 3)}
                    iso2={data.info[0].iso2}
                    coordinates={data.coord}
                  />
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
