/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './Auth/Auth'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AppContext } from './AppContext'
import Home from './Home/Home'
import { User } from './utils/Interface'
import { APIService } from './Services/APIService'

export const removeAccessToken = () => {
  Cookies.remove('access_token_cookie')
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loggedInUser, setLoggedInUser] = useState<User>()
  const appContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    loggedInUser,
    setLoggedInUser,
  }
  // Check if user is logged in
  useEffect(() => {
    const token = Cookies.get('access_token_cookie')
    console.log(token)
    if (token) {
      // Process the token
      loadUserData()
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    if(isLoggedIn) {
      loadUserData()
    }
  }, [isLoggedIn])

  const loadUserData = async () => {
    const user = (await APIService.getUserInfo()) as User
    setLoggedInUser!({
      name: user?.name,
      _id: user?._id,
      email: user?.email,
      picture: user?.picture,
    })
  }

  return (
    <Router>
      <AppContext.Provider value={appContextValue}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
        </Routes>
      </AppContext.Provider>
    </Router>
  )
}

export default App
