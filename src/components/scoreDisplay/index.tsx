import React, { useState, useEffect, useRef, useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import gameContext from "../../contexts/gameContext";
import "./scoreDisplay.css";

interface props {
  correct: number;
}

const ScoreDisplay = (props: props) => {
  const [percentage, setPercentage] = useState<number>(0);
  const [red, setRed] = useState<number>(510);
  const [green, setGreen] = useState<number>(0);
  const [reactionText, setReactionText] = useState<string>("Reaction")

  const reactionRef = useRef<HTMLDivElement>(null);

  const { score, setScore, guess } = useContext(gameContext);

  // let fraction =
  //   props.score > 7 ? `${Math.round((props.score * 12) / 100)}/12` : 0;

  useEffect(() => {
    setTimeout(() => {
      if (percentage < score / 2) {
        setPercentage(percentage + 1);
      }
    }, 25);
    setTimeout(() => {
      if (percentage >= score / 2 && percentage < score * 0.75) {
        setPercentage(percentage + 1);
      }
    }, 50);
    setTimeout(() => {
      if (percentage >= score * 0.75 && percentage < score) {
        setPercentage(percentage + 1);
      }
    }, 100);
    setRed(510 - 5.1 * percentage);
    setGreen(5.1 * percentage);
    if (percentage === 100) {
      setReactionText("ACE!")
      reactionRef.current?.setAttribute(
        "class",
        "text-white text-5xl italic font-bold"
      );
    }
  }, [percentage]);

  return (
    <div>
      <div
        className="score-display z-0"
        style={{
          color: `rgb(${red}, ${green}, 0)`,
          stroke: `rgb(${red} ${green}, 0)`,
          fill: `rgb(${red}, ${green}, 0)`,
        }}
      >
        <CircularProgressbar
          className="mx-auto my-3"
          value={percentage}
          text={percentage.toString()}
        />
      </div>
      <h3 className="text-white">
        Your Guess: <strong>{guess} million</strong>{" "}
      </h3>
      <h3 className="text-white">
        Correct Answer: <strong>{props.correct} million</strong>
      </h3>
      <h1
        className="text-white text-5xl italic font-bold invisible"
        ref={reactionRef}
      >
        {reactionText}
      </h1>
    </div>
  );
};

export default ScoreDisplay;
