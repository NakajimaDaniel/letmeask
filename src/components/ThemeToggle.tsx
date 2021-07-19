import { useTheme } from "../hooks/useTheme"
import sunImg from '../assets/sun.svg'
import moonImg from '../assets/moon.svg'

export function ThemeToggle() {

  const { theme, setTheme } = useTheme();

  const handleChangeThemeToggle = (theme: string) => {
    if(theme === 'light') {
      setTheme('dark')
    } else if(theme === 'dark') {
      setTheme('light')
    }
  }

  return (
    <div>
      <button  className={theme === 'light' ?  "bg-black-lightness rounded-md h-10 w-10 border border-gray-400" : "bg-black-lightness rounded-md h-10 w-10 border border-gray-700"}   onClick={() => handleChangeThemeToggle(theme)}> 
        {theme === 'light'? (
          <div className="flex items-center justify-center">
            <img src={moonImg} alt="moon" />
          </div>
        ):(
          <div className="flex items-center justify-center">
            <img src={sunImg} alt="sun" />
          </div>
        )}
      </button>
    </div>
  )
}