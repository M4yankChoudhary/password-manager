/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './Auth/Auth'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AppContext } from './AppContext'
import Home from './Home/Home'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const appContextValue = {
    isLoggedIn,
    setIsLoggedIn,
  }
  // Check if user is logged in
  useEffect(() => {
    const token = Cookies.get('access_token_cookie')
    if (token) {
      // Process the token
    } else {
      setIsLoggedIn(false)
    }
  }, [])

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
