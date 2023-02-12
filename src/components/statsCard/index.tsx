import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine,
faHeartCrack,
faTrophy,
faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface props {
  name: string;
  value: number;
  icon: IconDefinition;
  subtitle: string;
}

const StatsCard = (props: props) => {
  return (
    <div className="shadow-md p-4 bg-slate-800 mb-5 rounded">
      <div className="flex row">
        <div className="w-6/12">
          <div className="flex flex-col">
            <div className="uppercase text-sm text-gray-400 font-bold">
              {props.name}
            </div>
            <div className="mt-1">
              <div className="flex space-x-2 items-center">
                <div className="text-3xl font-bold">{props.value}</div>
                {props.subtitle ? <div className="text-xs text-slate-800 bg-slate-200 rounded-md p-1">
                  ({props.subtitle})
                </div> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="w-6/12 flex items-center justify-center">
          <div className="text-4xl">
            <FontAwesomeIcon icon={props.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
