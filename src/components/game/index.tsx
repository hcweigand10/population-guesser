import React, { useState, useEffect, useContext, SetStateAction } from "react";
import { useQuery } from "react-query";
import fetchCountryData from "../../utils/axios";
import countryList from "../../utils/countryList";
import GlobeComponent from "../globe";
import Loading from "../loading";
import ScoreDisplay from "../scoreDisplay";
import gameContext from "../../contexts/gameContext";
import "./game.component.css";

import Globe from "react-globe.gl";
import { SizeMe } from "react-sizeme";
import { useLocation } from "react-router-dom";
import Flag from "../flag";
const strict = 0.4;

const Game = () => {
  const location = useLocation();
  const [mode, setMode] = useState<string>(location.pathname);
  const [input, setInput] = useState<string>("");


  const { country, setCountry, score, setScore, setGuess } =
    useContext(gameContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [country],
    queryFn: () => fetchCountryData(country),
    // onSuccess: (data): void => {
    //   setTimeout(function() { //Start the timer
    //     setRender(true) //After 1 second, set render to true
    //   }, 1000)
    // },
    staleTime: 100000000000,
  });

  const checkGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSuccess) {
      setGuess(parseFloat(input));
      const calculatedScore: number = calculateScore(parseFloat(input));
      setScore(calculatedScore);
      setInput("");
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
    return parseInt(result.toFixed(2));
  };

  const newCountry = () => {
    setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
    setScore(-1);
  };

  return (
    <div
      className="game z-0 flex justify-center content-center"
      style={{ height: "calc(100vh - 103px)" }}
    >
      <div className="h-full">
        <SizeMe>
          {({ size }) => (
            <div className="flex flex-column h-full w-full justify-center overflow-visible font-display ">
              {data && size ? (
                <div className="game-container flex flex-col justify-center h-full">
                  {/* first section */}
                  <div className="flex justify-center z-10">
                    {score >= 0 ? (
                      <div className="flex flex-col">
                        <h1 className="text-4xl leading-9 tracking-tight mt-2 font-display text-white bg-blue hover:backdrop-brightness-50 p-2 rounded-md">
                          {country} <Flag country={country} /> 
                        </h1>
                        <ScoreDisplay
                          correct={data?.info[0].population / 1000}
                        />
                        {mode === "/practice" ? (
                          <button
                            type="button"
                            className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 mt-2 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none"
                            onClick={newCountry}
                          >
                            New Country
                          </button>
                        ) : null}
                      </div>
                    ) : (
                      <form onSubmit={checkGuess}>
                        <h1 className="text-3xl leading-9 tracking-tight mt-2 text-white hover:backdrop-brightness-50 p-2 rounded-md">
                          {country} <Flag country={country} />
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
                          <div className="flex flex-row gap-3 mx-2">
                            <button
                              type="submit"
                              className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 mt-3 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none"
                            >
                              Submit Guess
                            </button>
                            {mode === "/practice" ? (
                              <button
                                type="button"
                                className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 mt-3 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none"
                                onClick={newCountry}
                              >
                                New Country
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="flex-1 md:flex-[0.5_0.5_0%]"></div>
                  <div className="absolute overflow-visible flex justify-center items-center z-0 top-0 left-0 right-0 bottom-0">
                    <GlobeComponent
                      width={window.innerWidth}
                      height={window.innerHeight - 103}
                      iso2={data.info[0].iso2}
                      coordinates={data.coord}
                    />
                  </div>
                  <div className="z-10 font-display my-10 leading-9">
                    {mode === "/practice" ? (
                      <div className="text-white p-2 flex-1">
                        Guess the population of the country displayed on the
                        globe. This is practice mode so you can try multiple
                        times.
                      </div>
                    ) : null}
                    {score > 0 && mode === "/" ? (
                      <h1 className="text-white text-center my-10 font-display text-xl">
                        Come back tomorrow to play the next daily challenge!
                      </h1>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent shadow-md mb-4"
                  ></div>
                  <h2 className="text-center text-white text-xl font-semibold">
                    Loading...
                  </h2>
                  <p className="w-1/3 text-center text-white">
                    This may take a few seconds, please don't close this page.
                  </p>
                </div>
              )}
            </div>
          )}
        </SizeMe>
      </div>
    </div>
  );
};

export default Game;
