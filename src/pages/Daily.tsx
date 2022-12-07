import React, { useState, useEffect } from "react";
import moment from "moment";
import Game from "../components/game";
import shuffledList from "../utils/shuffledList";


const Daily = () => {
    const [country, setCountry] = useState<string>("");
    const [score, setScore] = useState<number>(-1);

    const now: string = moment().format("YYYY-MM-DD");
    const daysSinceDec1: number =
        parseInt(moment("2022-12-01", "YYYY-MM-DD").fromNow().split(" ")[0]) %
        shuffledList.length;

    useEffect(() => {
        setCountry(shuffledList[daysSinceDec1]);
        const storedScore = localStorage.getItem(now);
        if (typeof storedScore === "string") {
            setScore(JSON.parse(storedScore).score);
        } 
    }, [daysSinceDec1, now]);

    useEffect(() => {
        if (score > 0) {
            localStorage.setItem(
                now,
                JSON.stringify({
                    score: score.toString(),
                })
            );
        }
    }, [score, now]);

    return (
        <div className="daily mx-auto max-w-4xl">
            <Game
                country={country}
                setCountry={setCountry}
                score={score}
                setScore={setScore}
            />
            {score > 0 && (
                <p>Come back tomorrow to play the next daily challenge!</p>
            )}
        </div>
    );
};

export default Daily;
