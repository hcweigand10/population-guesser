import React, { useState, useEffect } from "react";
import { score } from "../interfaces/interfaces";

const Stats = () => {
  const [scores, setScores] = useState<score[]>([]);
  const [average, setAverage] = useState<number>();

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("scores") || "[]");
    if (storedScores) {
      setScores(storedScores);
    }
  }, []);

  useEffect(() => {
    setAverage(
      Math.round(
        scores.reduce((prev: number, curr) => {
          return prev + curr.score;
        }, 0) / scores.length
      )
    );
  }, [scores]);

  return (
    <div className="text-white">
      <h3>Stats</h3>
      <h5>Average: {average}</h5>
    </div>
  );
};

export default Stats;
