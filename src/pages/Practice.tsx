import React, { useState, useEffect, useContext } from "react";
import Game from "../components/game";
import countryList from "../utils/countryList";
import gameContext from "../contexts/gameContext";


const Practice = () => {
  const { setCountry, setScore } = useContext(gameContext)

    useEffect(() => {
        newCountry();
    }, []);

    const newCountry = () => {
        setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
        setScore(-1)
    };

    return (
        <div className="practice mx-auto my-auto md:max-w-2xl ">
            {/* <div className="flex-1 flex justify-center my-5">
            <button type="button" className="shadow-2xl my-button mx-auto py-3 px-8 bg-blue-700 my-5 flex justify-center items-center rounded-full cursor-pointer relative overflow-hidden font-bold uppercase tracking-wider text-white focus:outline-none" onClick={newCountry}>New Country</button>
            </div> */}
            <div className="flex-1">
                <Game/>
            </div>
        </div>
    );
};

export default Practice;
