import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import fetchCountryData from "./utils/axios";
import { useQuery } from "react-query";
import "./App.css";
import Daily from "./pages/Daily";
import Practice from "./pages/Practice";
import Navbar from "./components/navbar/Navbar";



function App() {

    return (
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Daily/>}/>
            <Route path="/practice" element={<Practice/>}/>
          </Routes>
        </BrowserRouter>
    );
}

export default App;
