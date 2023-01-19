import React, { useState, useEffect, useContext, SetStateAction } from "react";
import { useQuery } from "react-query";
import fetchCountryData from "../../utils/axios";
import countryList from "../../utils/countryList";
import GlobeComponent from "../globe";
import Loading from "../loading";
import ScoreDisplay from "../scoreDisplay";
import gameContext from "../../contexts/gameContext";
import "./game.component.css";
import moment from "moment";
import Modal from "../modal/modal";

import Globe from "react-globe.gl";
import { SizeMe } from "react-sizeme";
import { useLocation } from "react-router-dom";
const strict = 0.4;

const Game = () => {
  const location = useLocation();
  const [mode, setMode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [width, setWidth] = useState(0);
  const [render, setRender] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  // const [population, setPopulation] = useState<number>(20);
  // const [iso2, setIso2] = useState<string>("")
  // const [coordinates, setCoordinates] = useState<number[]>([])

  const { country, setCountry, score, setScore } = useContext(gameContext);

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
      console.log("check");
      const calculatedScore: number = calculateScore(parseInt(input));
      setScore(calculatedScore);
    }
  };

  
  const handleModal = () => {
    console.log("test");
    setModalStatus(!modalStatus);
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
    const timer = setTimeout(() => {
      console.log("inital timeout");
      setRender(true);
    }, 5000);
    if (parent.current) {
      setWidth(parent?.current.offsetWidth);
    }
    setMode(location.pathname);
    return () => clearTimeout(timer);
  }, []);

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
        {modalStatus ? (
          <Modal setModalStatus={setModalStatus} modalStatus />
        ) : (
          ""
        )}

        {/* <SizeMe>
          {({ size }) => ( */}
        <div className="flex flex-column h-full justify-center overflow-auto">
          {data && render ? (
            <div className="game-container flex flex-col  justify-center h-full ">
              <div className="w-full flex justify-center">
                {/* <div onClick={() => handleModal()}>
                  <svg
                    className="w-6 h-6 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div> */}
              </div>
              {/* first section */}
              <div className="flex justify-center">
                {score >= 0 ? (
                  <div className="flex flex-col">
                    <h1 className="text-3xl leading-9 tracking-tight mt-2 text-white">
                      {country}
                    </h1>
                    <ScoreDisplay score={score} />
                    {mode === "/practice" ? (
                      <button
                        type="button"
                        className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 mt-2 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none"
                        onClick={newCountry}
                      >
                        New Country
                      </button>
                    ) : (
                      <h3>Come back tomorrow for the next country!</h3>
                    )}
                  </div>
                ) : (
                  <form onSubmit={checkGuess}>
                    <h1 className="text-3xl leading-9 tracking-tight mt-2 text-white">
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
              <GlobeComponent
                width={330}
                height={360}
                iso2={data.info[0].iso2}
                coordinates={data.coord}
              />
              <div className="text-white p-2">
                Guess the population of the country displayed on the globe.This
                is practice mode so you can try multiple times
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
        {/* )}
        </SizeMe> */}
      </div>
    </div>
  );
};

export default Game;
