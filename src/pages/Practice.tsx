import React, { useState, useEffect } from "react";
import Game from "../components/game";
import countryList from "../utils/countryList";

const Practice = () => {
    const [country, setCountry] = useState<string>("");
    const [score, setScore] = useState<number>(-1);

    useEffect(() => {
        newCountry();
        // setCountry("United Arab Emirates")
    }, []);

    const newCountry = () => {
        setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
        setScore(-1)
    };

    return (
        <div className="practice mx-auto max-w-4xl">
            <Game country={country} setCountry={setCountry} score={score} setScore={setScore}/>
            <button type="button" className="bg-indigo-500 p-1 rounded-lg text-white" onClick={newCountry}>New Country</button>
        </div>
    );
};

export default Practice;
