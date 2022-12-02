import React, { useState } from "react";
import "./scoreDisplay.css"

interface props {
    score: number;
}

const ScoreDisplay = (props: props) => {
    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar"
                style={{ width: `${props.score}%` }}
            ></div>
        </div>
    );
};

export default ScoreDisplay;
