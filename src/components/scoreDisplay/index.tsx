import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./scoreDisplay.css";

interface props {
  score: number;
}

const ScoreDisplay = (props: props) => {
  const [percentage, setPercentage] = useState(0)
  const [red, setRed] = useState(510)
  const [green, setGreen] = useState(0)
  const progress = useRef<HTMLDivElement>(null)


  // let fraction =
  //   props.score > 7 ? `${Math.round((props.score * 12) / 100)}/12` : 0;

  useEffect(() => {
    setTimeout(() => {
      if (percentage < props.score/2) {
        setPercentage(percentage + 1);
      }
    }, 25);
    setTimeout(() => {
      if (percentage > props.score/2 && percentage < props.score*0.75) {
        setPercentage(percentage + 1);
      }
    }, 50);
    setTimeout(() => {
      if (percentage > props.score*0.75 && percentage < props.score) {
        setPercentage(percentage + 1);
      }
    }, 100);
    setRed(510-(5.1*percentage))
    setGreen(5.1*percentage)
  }, [percentage]);


  return (
    <div className="score-display z-0" style={{color: `rgb(${red}, ${green}, 0)`, stroke: `rgb(${red} ${green}, 0)`, fill: `rgb(${red}, ${green}, 0)`}} ref={progress}>
      <p>Hello</p>
      {/* <div className="progress-bar-container mx-auto w-24 bg-white-100 border">
                <div
                    className={`progress-bar w-${fraction} transition-[width] bg-green-500 h-6`}
                    // className={`progress-bar w-5/12 transition-all bg-green-500 h-6`}
                ></div>
            </div>
            <h4>You scored {props.score}!</h4> */}
      <CircularProgressbar value={percentage} text={percentage.toString()} />
      {props.score === 0 ? <h6 className="text-xs">(you good bruh?)</h6> : null}
    </div>
  );
};

export default ScoreDisplay;
