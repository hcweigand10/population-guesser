import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Game from "../components/game";
import shuffledList from "../utils/shuffledList";
import gameContext from "../contexts/gameContext";


const Daily = () => {

  const {country, setCountry, score, setScore } = useContext(gameContext)

  const now: string = moment().format("YYYY-MM-DD")

  //Difference in number of day
  const daysSinceDec1: number = moment(moment().format("YYYY-MM-DD")).diff(moment("2022-12-01", "YYYY-MM-DD"), 'days');

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
        <div className="daily mx-auto w-full md:max-w-2xl">
            <Game/>
            {score > 0 && (
                <h1>Come back tomorrow to play the next daily challenge!</h1>
            )}
        </div>
    );
};

export default Daily;
