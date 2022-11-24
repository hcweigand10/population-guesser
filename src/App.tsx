import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import fetchCountryData from "./utils/axios";
import { useQuery } from "react-query";
import "./App.css";

const countryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Angola",
    "Antarctica",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Democratic Republic of the Congo",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Korea Korea",
    "South Korea",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mayotte",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Samoa",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    // "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];
const strict = 0.3

function App() {
    const [country, setCountry] = useState<string>();
    const [input, setInput] = useState<string>("");
    const [answer, setAnswer] = useState<number>(20);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [score, setScore] = useState<number>();

    useEffect(() => {
        setCountry(countryList[Math.floor(Math.random() * countryList.length)]);
        // setCountry("United Arab Emirates")
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const checkGuess = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSuccess) {
            setScore(getScore());
            setShowScore(true);
        }
    };

    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: [country || ""],
        queryFn: () => fetchCountryData(country || ""),
        onSuccess: (data): void => setAnswer(data[0].population/1000),
    });

    const getScore = () => {
      const guess:number = parseFloat(input)
      console.log(guess,answer)
      // wow, look at this
      const result:number = 100*Math.E**(-((10*strict**2)/(answer**0.1))*(Math.log(answer)-Math.log(guess))**2)
      return result
    };

    return (
        <div className="App">
            <h2>{country}</h2>
            {isError && <p>error</p>}
            {isLoading ? <p>Loading...</p> : <p>data recieved</p>}
            {isSuccess && data.length > 0 && (
                <div>
                    <p>Population: {data[0].population / 1000}M</p>
                    <form onSubmit={checkGuess}>
                        <input
                            placeholder="Guess here!"
                            onChange={handleInputChange}
                        ></input>
                        <button type="submit">Submit Guess</button>
                    </form>
                </div>
            )}

            {showScore && score && <p>Your Score is: {score.toLocaleString("en-US")}!</p>}
        </div>
    );
}

export default App;
