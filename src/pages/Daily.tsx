import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Game from "../components/game";
import shuffledList from "../utils/shuffledList";
import gameContext from "../contexts/gameContext";
import Modal from "../components/modal";

const Daily = () => {
  const [showModal, setShowModal] = React.useState(true);

  const { country, setCountry, score, setScore, guess, setGuess } =
    useContext(gameContext);

  const now: string = moment().format("YYYY-MM-DD");

  //Difference in number of day
  const daysSinceDec1: number = moment(moment().format("YYYY-MM-DD")).diff(
    moment("2022-12-01", "YYYY-MM-DD"),
    "days"
  );

  useEffect(() => {
    setCountry(shuffledList[daysSinceDec1]);
    const storedScores = JSON.parse(localStorage.getItem("scores") || "null");
    // if (storedScores) {
    //   const latestScore = storedScores.pop()
    //   if (latestScore.date === now) {
    //     setScore(parseFloat(latestScore.score))
    //     console.log(latestScore.score)
    //     setGuess(parseFloat(latestScore.guess))
    //   }
    // }
  }, [daysSinceDec1, now]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("scores") || "null");
    // check if user has guessed

    // check if previous scores exist, if not create new array
    if (storedScores) {
      // check if today's score has been added
      const latestScore = storedScores[storedScores.length - 1];
      if (latestScore.date !== now) {
        if (score > 0) {
          localStorage.setItem(
            "scores",
            JSON.stringify([
              ...storedScores,
              { date: now, score: score, guess: guess },
            ])
          );
        }
      } else {
        setScore(latestScore.score)
        setGuess(latestScore.guess)
      }
    } else {
      if (score > 0) {
        saveScore()
      }
    }
  }, [score, now]);

  const saveScore = () => {
    const storedScores = JSON.parse(localStorage.getItem("scores") || "[]");
    localStorage.setItem(
      "scores",
      JSON.stringify([...storedScores, {date: now, score: score, guess: guess}])
    );
  }

  return (
    <div className="daily mx-auto w-full md:max-w-2xl">
      <Modal showModal={showModal} setShowModal={setShowModal}/>
      <Game />
    </div>
  );
};

export default Daily;
