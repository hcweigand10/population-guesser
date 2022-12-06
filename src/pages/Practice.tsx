import React, { useState, useEffect } from "react";
import Game from "../components/game";
import countryList from "../utils/countryList";

const Practice = () => {
    const [country, setCountry] = useState<string>("");
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        newCountry();
        // setCountry("United Arab Emirates")
    }, []);

    const newCountry = () => {
        setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
        setScore(0)
    };

    return (
        <>
            <Game country={country} score={score} setScore={setScore} />
            <button onClick={newCountry}>New Country</button>
        </>
    );
};

export default Practice;
