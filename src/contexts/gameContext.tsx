import React from "react";
import {gameProps} from "../interfaces/interfaces"

export default React.createContext<gameProps>({
  country: "",
  setCountry: () => {},
  score: -1,
  setScore: () => {},
  guess: -1,
  setGuess: () => {}
});
