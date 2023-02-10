import { Dispatch, SetStateAction } from "react"

export interface gameProps {
    country: string,
    setCountry: Dispatch<SetStateAction<string>>,
    score: number,
    setScore: Dispatch<SetStateAction<number>>,
    guess: number,
    setGuess: Dispatch<SetStateAction<number>>,
}

export interface userInfo {
  email: string | null,
  name: string | null,
  pic: string | null
}

export type userContext = {
  userInfo: userInfo,
  setUserInfo: Dispatch<SetStateAction<userInfo>>,
}

export interface score  {
  date: string,
  score: number,
  guess: number,
  country: string,
}