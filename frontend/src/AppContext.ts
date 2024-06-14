import { createContext, useContext } from 'react'
interface appContextProps {
    isLoggedIn?: boolean,
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>
  }
export const AppContext = createContext<appContextProps>({})
export const useAppContext = (): appContextProps => useContext(AppContext)!;