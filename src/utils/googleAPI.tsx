import axios from "axios"

const googleAPI = axios.create({
  baseURL: "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=",
  timeout: 7000
})

const getGoogleInfo = async (token: string) => {
  const response = await axios.get(`${token}`)
  return response
}

export default getGoogleInfo