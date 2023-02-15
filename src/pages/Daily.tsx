import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Game from "../components/game";
import shuffledList from "../utils/shuffledList";
import gameContext from "../contexts/gameContext";
import Modal from "../components/modal";

const Daily = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [savedScores, setSavedScores] = useState<boolean>(false);

  const { country, setCountry, score, setScore, guess, setGuess } =
    useContext(gameContext);

  const now: string = moment().format("YYYY-MM-DD");

  //Difference in number of day
  const daysSinceDec1: number = moment(moment().format("YYYY-MM-DD")).diff(
    moment("2022-12-01", "YYYY-MM-DD"),
    "days"
  );

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("scores") || "null");
    if (storedScores !== null) {
      setSavedScores(true);
    }
  });

  useEffect(() => {
    setCountry(shuffledList[daysSinceDec1]);
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
        setScore(latestScore.score);
        setGuess(latestScore.guess);
      }
    } else {
      if (score > 0) {
        saveScore();
      }
    }
  }, [score, now]);

  const saveScore = () => {
    const storedScores = JSON.parse(localStorage.getItem("scores") || "[]");
    localStorage.setItem(
      "scores",
      JSON.stringify([
        ...storedScores,
        { date: now, score: score, guess: guess },
      ])
    );
  };

  return (
    <div className="daily mx-auto w-full md:max-w-2xl relative z-10">
      <div className="flex-1">
        {savedScores ? (
          ""
        ) : (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        )}
        <Game />
      </div>
    </div>
  );
};

export default Daily;
