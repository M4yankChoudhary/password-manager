import { Box } from '@mui/material'
import { useAppContext } from '../AppContext'
import { useEffect } from 'react'
import ProfileCard from './components/ProfileCard'

const Home = () => {
  const { loggedInUser } = useAppContext()
  useEffect(() => {
    console.log('LOGG', loggedInUser)
  }, [loggedInUser])
  return (
    <Box className={'center'} sx={{
      flexDirection:'column'
    }} width={1}>
      <ProfileCard user={loggedInUser} />
      
    </Box>
  )
}

export default Home
