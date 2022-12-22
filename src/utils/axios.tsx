import axios from "axios"

const countriesAPI = axios.create({
    baseURL: "https://api.api-ninjas.com/v1/country",
    timeout: 7000,
    headers: {"X-Api-Key": "Vuc0wRAxfMwf6m/upt0Jzw==DzPqkT5KWqzrVkzN"}
})

const fetchCountryData = async (country: string) => {
    console.log(country);
    const response = await countriesAPI.get(`?name=${country}`)
    console.log(response);
    const latLing = await fetch(`https://restcountries.com/v2/alpha/${response.data[0].iso2}`);
    const latLingData = await latLing.json();
    console.log({info: response.data, coord: latLingData.latlng}, "info")
    return  {info: response.data, coord: latLingData.latlng};
}

export default fetchCountryData