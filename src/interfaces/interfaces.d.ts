export interface gameProps {
    country: string,
    setCountry: Dispatch<SetStateAction<string>>,
    score: number,
    setScore: Dispatch<SetStateAction<string>>
}