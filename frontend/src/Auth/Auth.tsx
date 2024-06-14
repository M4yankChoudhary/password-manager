import { Box, Button, Card, Typography } from '@mui/material'
import GoogleLogo from '../assets/images/google.png'
import Logo from '../assets/images/logo.png'

const Auth = () => {
  const performSignin = () => {}
  return (
    <Box className="center" sx={{ height: '100vh', width: 1 }}>
      <Card className="center" sx={{
        width: '400px',
        px:"16px",
        py:"16px",
        boxShadow:"0px 10px 15px -3px rgba(0,0,0,0.1)",
        borderRadius: '16px',
        flexDirection: 'column',
      }}>
        <img src={Logo} width={"200px"} height={"200px"}/>
        <Typography variant='h4'>Password Manager</Typography>
        <Typography sx={{fontSize: '12px'}}>Manage your password with secure vaults.</Typography>
        <Button sx={{
            border: '1px solid black',
            px: "16px",
            borderRadius: '24px',
            color: 'black',
            textTransform: 'none',
            marginTop: '16px'
        }}><img src={GoogleLogo} width={"32px"} height={"32px"}/>Sign in With Google</Button>
      </Card>
    </Box>
  )
}

export default Auth
