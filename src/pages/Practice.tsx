import React, { useState, useEffect } from "react";
import Game from "../components/game/Game";
import countryList from "../utils/countryList";

const Practice = () => {
    const [country, setCountry] = useState<string>("");

    useEffect(() => {
        setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
        // setCountry("United Arab Emirates")
    }, []);

    return (
        <Game country={country}/>
    );
};

export default Practice;
