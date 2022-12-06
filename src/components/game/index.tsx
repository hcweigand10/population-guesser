import React, { useState, useEffect, SetStateAction } from "react";
import { useQuery } from "react-query";
import fetchCountryData from "../../utils/axios";
import countryList from "../../utils/countryList";
import GlobeComponent from "../globe";
import Loading from "../loading";
import ScoreDisplay from "../scoreDisplay";
import "./game.css";

const strict = 0.3;

interface props {
    country: string;
    score: number;
    setScore: React.Dispatch<SetStateAction<number>>;
}

const Game = (props: props) => {
    const [input, setInput] = useState<string>("");
    const [population, setPopulation] = useState<number>(20);
    const [iso2, setIso2] = useState<string>("")
    const [coordinates, setCoordinates] = useState<number[]>([])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: [props.country || ""],
        queryFn: () => fetchCountryData(props.country || ""),
        onSuccess: (data): void => {
            setPopulation(data.info[0].population / 1000);
            setIso2(data.info[0].iso2)
            setCoordinates(data.coord)
        },
    });

    const checkGuess = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSuccess) {
            const calculatedScore: number = calculateScore(parseInt(input));
            props.setScore(calculatedScore);
        }
    };

    const calculateScore = (guess: number): number => {
        // wow, look at this
        const result: number =
            100 *
            Math.E **
                (-((10 * strict ** 2) / population ** 0.1) *
                    (Math.log(population) - Math.log(guess)) ** 2);
        return parseInt(result.toFixed(2));
    };

    return (
        <div className="game">
            <h2>{props.country}</h2>
            {isError && <p>error</p>}
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div>
                        {props.score > 0 ? (
                            <ScoreDisplay score={props.score} />
                        ) : (
                            <form onSubmit={checkGuess}>
                                <input
                                    placeholder="Guess here! (in millions)"
                                    onChange={handleInputChange}
                                ></input>
                                <button type="submit">Submit Guess</button>
                            </form>
                        )}
                    </div>
                    <GlobeComponent country={props.country} iso2={iso2} population={population} coordinates={coordinates}/>
                </>
            )}
        </div>
    );
};

export default Game;
