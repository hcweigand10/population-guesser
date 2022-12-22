import axios from "axios"

const googleAPI = axios.create({
  baseURL: "https://www.googleapis.com/oauth2/v3",
  timeout: 7000
})

const getGoogleInfo = async (token: string) => {
  const response = await googleAPI.get(`tokeninfo?id_token=${token}`)
  return response
}

export default getGoogleInfo