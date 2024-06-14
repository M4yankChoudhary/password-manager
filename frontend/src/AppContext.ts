import { createContext, useContext } from "react";
import { User } from "./utils/Interface";
interface appContextProps {
  isLoggedIn?: boolean;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUser?: User;
  setLoggedInUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
}
export const AppContext = createContext<appContextProps>({});
export const useAppContext = (): appContextProps => useContext(AppContext)!;


