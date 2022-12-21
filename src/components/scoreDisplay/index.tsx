import React, { useState } from "react";
import "./scoreDisplay.css";

interface props {
    score: number;
}

const ScoreDisplay = (props: props) => {

    let fraction = props.score > 7 ? `${Math.round(props.score * 12 / 100)}/12` : 0

    return (
        <div className="score-display z-0">
            <div className="progress-bar-container mx-auto w-24 bg-white-100 border">
                <div
                    className={`progress-bar w-${fraction} transition-[width] bg-green-500 h-6`}
                    // className={`progress-bar w-5/12 transition-all bg-green-500 h-6`}
                ></div>
            </div>
            <h4>You scored {props.score}!</h4>
            {props.score === 0 ? <h6 className="text-xs">(you good bruh?)</h6> : null}
        </div>
    );
};

export default ScoreDisplay;
