import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import fetchCountryData from "../../utils/axios";
import countryList from "../../utils/countryList";

const strict = 0.3

interface props {
    country: string
}

const Game = (props: props) => {
    const [input, setInput] = useState<string>("");
    const [answer, setAnswer] = useState<number>(20);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [score, setScore] = useState<number>();

    // useEffect(() => {
    //     setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
    //     // setCountry("United Arab Emirates")
    // }, []);

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

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: [props.country || ""],
        queryFn: () => fetchCountryData(props.country || ""),
        onSuccess: (data: [{population: number}]): void => setAnswer(data[0].population/1000),
    });

    const getScore = () => {
      const guess:number = parseFloat(input)
      console.log(guess,answer)
      // wow, look at this
      const result:number = 100*Math.E**(-((10*strict**2)/(answer**0.1))*(Math.log(answer)-Math.log(guess))**2)
      return result
    };

    return (
        <div className="App">
            <h2>{props.country}</h2>
            {isError && <p>error</p>}
            {isLoading ? <p>Loading...</p> : <p>data recieved</p>}
            {isSuccess && data.length > 0 && (
                <div>
                    <p>Population: {data[0].population / 1000}M</p>
                    <form onSubmit={checkGuess}>
                        <input
                            placeholder="Guess here!"
                            onChange={handleInputChange}
                        ></input>
                        <button type="submit">Submit Guess</button>
                    </form>
                </div>
            )}

            {showScore && score && <p>Your Score is: {score.toLocaleString("en-US")}!</p>}
        </div>
    );
}

export default Game