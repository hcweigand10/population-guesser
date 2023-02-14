import React, { useState, useEffect } from "react";
import { score } from "../interfaces/interfaces";
import StatsCard from "../components/statsCard";
import { faChartLine,
  faHeartCrack,
  faTrophy,
  faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Histogram from "../components/histogram";

const Stats = () => {
  const [scores, setScores] = useState<score[]>(JSON.parse(localStorage.getItem("scores") || "[]"));

  const sortedScores = scores.sort((a,b) => a.score - b.score)
  const histogramscores = scores.map(score => {
    return {score: score.score}
  })
  const average = Math.round(scores.reduce((prev,curr) => {
    return prev + curr.score
  }, 0)/scores.length)

  const best = sortedScores
  [scores.length - 1]
  const worst = sortedScores[0]

  return (
    <div className="text-white p-5 max-w-5xl mx-auto">
      <h1 className="text-4xl py-3 mb-4 text-center">Stats</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <StatsCard name="total games" value={scores.length} icon={faChartLine} subtitle=""/>
        <StatsCard name="average" value={average} icon={faThumbsUp} subtitle=""/>
        <StatsCard name="best" value={best.score} icon={faTrophy} subtitle={best.country}/>
        <StatsCard name="worst" value={worst.score} icon={faHeartCrack} subtitle={worst.country}/>
      </div>
      <Histogram scores={histogramscores}/>
    </div>
  );
};

export default Stats;