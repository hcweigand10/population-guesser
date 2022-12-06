import React, { useState, useEffect } from "react";
import moment from "moment"
import Game from "../components/game/Game";
import shuffledList from "../utils/shuffledList";

import GlobeComponent from "../components/globe/Globe";

const Daily = () => {
    const [country, setCountry] = useState<string>();

    const now = moment().format("MM-DD-YYYY")

    useEffect(() => {
        const storedScore = localStorage.getItem(now)
        if (storedScore) {
            
        }
    }, [])
    

    return (
        <div>
            <h3>Daily</h3>
            <Game country="Albania"/>
            <GlobeComponent/>
        </div>
    );
};

export default Daily;
