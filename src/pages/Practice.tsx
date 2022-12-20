import React, { useState, useEffect, useContext } from "react";
import Game from "../components/game";
import countryList from "../utils/countryList";
import gameContext from "../contexts/gameContext";


const Practice = () => {
  const { setCountry, setScore } = useContext(gameContext)

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
            <Game/>
            <button type="button" className="bg-indigo-500 p-1 rounded-lg text-white" onClick={newCountry}>New Country</button>
        </div>
    );
};

export default Practice;
