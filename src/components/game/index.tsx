import React, { useState, useEffect, SetStateAction } from "react";
import { useQuery } from "react-query";
import fetchCountryData from "../../utils/axios";
import countryList from "../../utils/countryList";
import GlobeComponent from "../globe";
import Loading from "../loading";
import ScoreDisplay from "../scoreDisplay";
import { gameProps } from "../../interfaces/interfaces";
import "./game.component.scss";
import moment from "moment";
import Globe from "react-globe.gl";
import { SizeMe } from "react-sizeme";
import { useLocation } from "react-router-dom";
const strict = 0.4;

const Game = (props: gameProps) => {
  const location = useLocation();
  const [mode, setMode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  // const [population, setPopulation] = useState<number>(20);
  // const [iso2, setIso2] = useState<string>("")
  // const [coordinates, setCoordinates] = useState<number[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: [props.country],
    queryFn: () => fetchCountryData(props.country),
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
      props.setScore(calculatedScore);
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
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (parent.current) {
      setWidth(parent?.current.offsetWidth);
    }
    setMode(location.pathname);
    // setCountry("United Arab Emirates")
  }, []);

  const newCountry = () => {
    props.setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
    props.setScore(-1);
  };

  return (
    <div className="game z-0 h-full" ref={parent}>
      <SizeMe>
        {({ size }) => (
          <div>
            {data && size.width ? (
              <div className="game-container flex m-auto flex-col static">
                <div className="flex-1 flex content-center justify-center">
                  {props.score >= 0 ? (
                    <div className="flex flex-col">
                    <h1 className="text-3xl leading-9 tracking-tight my-5 text-white">
                        {props.country}
                      </h1>
                    <ScoreDisplay score={props.score} />
                    </div>
                  ) : (
                    <form className=" py-1 " onSubmit={checkGuess}>
                      <h1 className="text-3xl leading-9 tracking-tight my-5 text-white">
                        {props.country}
                      </h1>
                      <h2>{isLoading && "loading"}</h2>
                      {isError && <p>{`${error}`}</p>}
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
                          ""
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
                    country={props.country}
                    iso2={data.info[0].iso2}
                    population={data.info[0].population}
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
