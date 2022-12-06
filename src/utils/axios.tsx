import axios from "axios"

const countriesAPI = axios.create({
    baseURL: "https://api.api-ninjas.com/v1/country",
    timeout: 7000,
    headers: {"X-Api-Key": "Vuc0wRAxfMwf6m/upt0Jzw==DzPqkT5KWqzrVkzN"}
})

const fetchCountryData = async (country: string) => {

    const response = await countriesAPI.get(`?name=${country}`)
    const latLing = await fetch(`https://restcountries.com/v2/alpha/${response.data[0].iso2}`);
    const latLingData = await latLing.json();
    return  {data: response.data, coord: latLingData.latlng};
}

export default fetchCountryData