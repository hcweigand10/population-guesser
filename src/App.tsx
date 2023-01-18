import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Daily from "./pages/Daily";
import Practice from "./pages/Practice";
import About from "./pages/About";
import Navigation from "./components/navigation";
import UserContext from "./contexts/userContext";
import { userInfo } from "./interfaces/interfaces";
import GameContext from "./contexts/gameContext";

function App() {
  const [userInfo, setUserInfo] = useState<userInfo>({
    email: null,
    name: null,
    pic: null,
  });
  const [country, setCountry] = useState<string>("");
  const [score, setScore] = useState<number>(-1);

  console.log(process.env.REACT_APP_CLIENT_ID)

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <GameContext.Provider value={{ country, setCountry, score, setScore }}>
        <Routes>
          <Route path="*" element={<Navigation />}>
            <Route index={true} element={<Daily />} />
            <Route path="practice" element={<Practice />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </GameContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
