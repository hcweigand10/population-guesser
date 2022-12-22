import React, { useState, useEffect } from "react";
import Game from "../components/game";
import countryList from "../utils/countryList";
import "./styles.pages.scss"
import { useLocation } from "react-router-dom";

const Practice = () => {
    const location = useLocation();
    const [country, setCountry] = useState<string>("");
    const [score, setScore] = useState<number>(-1);
    const [mode, setMode] = useState<string>("")

    useEffect(() => {
        newCountry();
        setMode(location.pathname)
        // setCountry("United Arab Emirates")
    }, []);

    const newCountry = () => {
        setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
        setScore(-1)
    };

    return (
        <div className="practice mx-auto my-auto md:max-w-2xl flex flex-col justify-center align-center">
            {/* <div className="flex-1 flex justify-center my-5">
            <button type="button" className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 my-5 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none" onClick={newCountry}>New Country</button>
            </div> */}
            <div className="flex-1">
                <Game country={country} setCountry={setCountry} score={score} setScore={setScore}/>
            </div>
        </div>
    );
};

export default Practice;
