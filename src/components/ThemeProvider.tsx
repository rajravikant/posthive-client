import { useSelector } from "react-redux"
import { RootState } from "../store/store"


export default function ThemeProvider({children}: {children: React.ReactNode}) {
    const {theme} = useSelector((state:RootState) => state.theme)
  return (
    <div className={`font-pop min-h-screen ${theme}`}>
      {children}
    </div>
  )
}
