import { Box } from '@mui/material'
import { useAppContext } from '../AppContext'
import { useEffect } from 'react'
import ProfileCard from './components/ProfileCard'
import VaultsList from './components/VaultsList'

const Home = () => {
  const { loggedInUser } = useAppContext()
  useEffect(() => {
    console.log('LOGG', loggedInUser)
  }, [loggedInUser])
  return (
    <Box
      className={'center'}
      sx={{
        flexDirection: 'column',
      }}
      width={1}
    >
      <ProfileCard user={loggedInUser} />
      <VaultsList/>
    </Box>
  )
}

export default Home
