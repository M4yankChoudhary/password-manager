import { Box, Button } from "@mui/material"
import { useAppContext } from "../AppContext"
import { useEffect } from "react"
import { removeAccessToken } from "../App"

const Home = () => {
  const {  loggedInUser, setIsLoggedIn } = useAppContext()
  useEffect(() => {console.log("LOGG",loggedInUser)}, [loggedInUser])
  return (
    <Box><Box>Welcome, {loggedInUser?.name}</Box><Button onClick={() => {
        removeAccessToken()
        setIsLoggedIn!(false)
    }}>Logout</Button></Box>
  )
}

export default Home