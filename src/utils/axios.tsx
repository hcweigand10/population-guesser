import axios from "axios"

const countriesAPI = axios.create({
    baseURL: "https://api.api-ninjas.com/v1/country",
    timeout: 7000,
    headers: {"X-Api-Key": process.env.REACT_APP_X_API_KEY}
})

const fetchCountryData = async (country: string) => {
    const response = await countriesAPI.get(`?name=${country}`)
    console.log(country)
    const latLong = await fetch(`https://restcountries.com/v2/alpha/${response.data[0].iso2}`);
    const latLongData = await latLong.json();
    return  {info: response.data, coord: latLongData.latlng};
}

export default fetchCountryData