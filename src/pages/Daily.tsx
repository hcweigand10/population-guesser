import React, { useState, useEffect } from "react";
import moment from "moment";
import Game from "../components/game";
import shuffledList from "../utils/shuffledList";

const Daily = () => {
    const [country, setCountry] = useState<string>("");
    const [score, setScore] = useState<number>(0);

    const now: string = moment().format("YYYY-MM-DD");
    const daysSinceDec1: number = parseInt(
        moment("2022-11-29", "YYYY-MM-DD").fromNow().split(" ")[0]
    );
    console.log(daysSinceDec1);

    useEffect(() => {
        setCountry(shuffledList[daysSinceDec1]);
        const storedScore: {score:number} = JSON.parse(localStorage.getItem(now) || "");
        if (storedScore) {
            setScore(storedScore.score)
        }
    }, [daysSinceDec1,now]);

    useEffect(() => {
        if (score > 0) {
            localStorage.setItem(
                now,
                JSON.stringify({
                    score: score.toString(),
                })
            );
        }
    }, [score]);

    return (
        <div>
            <h3>Daily</h3>
            <Game country={country} score={score} setScore={setScore} />
        </div>
    );
};

export default Daily;
