import { Box, Button, Card, Typography } from '@mui/material'
import GoogleLogo from '../assets/images/google.png'
import Logo from '../assets/images/logo.png'
import { useGoogleLogin } from '@react-oauth/google'
import { useAppContext } from '../AppContext'
import { useState } from 'react'
import Loader from '../utils/Loader'
import axios from 'axios'
import { APIService } from '../Services/APIService'
import { User } from '../utils/interface/Interface'
import { removeAccessToken } from '../App'

const Auth = () => {
  const { setIsLoggedIn, setLoggedInUser } = useAppContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setIsLoading(true)
      console.log(codeResponse)
      try {
        const response = await axios.post(
          `${process.env.BACKEND_URL}/login`,
          {
            code: codeResponse.code,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        setIsLoggedIn!(true)
        setIsLoading(false)
        try {
          const user = (await APIService.getUserInfo())  as User
          setLoggedInUser!({
            name: user?.name,
            _id: user?._id,
            email: user?.email,
            picture: user?.picture,
          })
        } catch (error) {
          removeAccessToken()
          setIsLoggedIn!(false)
          setIsLoading(false)
        }
        return response.data
      } catch (error) {
        removeAccessToken()
        setIsLoggedIn!(false)
        setIsLoading(false)
        console.error('Error fetching data:', error)
      }
    },
    onError: async (e) => {
      e && setIsLoggedIn && setIsLoggedIn(false)
      setIsLoading(false)
    },
  })

  return (
    <Box className="center" sx={{ height: '100vh', width: 1 }}>
      <Card
        className="center"
        sx={{
          width: '400px',
          px: '16px',
          py: '16px',
          boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
          borderRadius: '16px',
          flexDirection: 'column',
        }}
      >
        <img src={Logo} width={'200px'} height={'200px'} />
        <Typography variant="h4">Password Manager</Typography>
        <Typography sx={{ fontSize: '12px' }}>
          Manage your password with secure vaults.
        </Typography>
        {isLoading ? (
          <Box>
            <Loader />
          </Box>
        ) : (
          <Button
            onClick={() => login()}
            sx={{
              border: '1px solid black',
              px: '16px',
              borderRadius: '24px',
              color: 'black',
              textTransform: 'none',
              marginTop: '16px',
            }}
          >
            <img src={GoogleLogo} width={'32px'} height={'32px'} />
            Sign in With Google
          </Button>
        )}
      </Card>
    </Box>
  )
}

export default Auth
