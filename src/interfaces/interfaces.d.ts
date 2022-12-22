export interface gameProps {
    country: string,
    setCountry: Dispatch<SetStateAction<string>>,
    score: number,
    setScore: Dispatch<SetStateAction<string>>
}

export interface userInfo {
  email: string | null,
  name: string | null,
  pic: string | null
}

export type userContext = {
  userInfo: userInfo,
  setUserInfo: React.Dispatch<React.SetStateAction<userInfo>>,
}