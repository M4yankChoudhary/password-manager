import { Box } from '@mui/material'
import { useAppContext } from '../AppContext'
import { useEffect } from 'react'
import ProfileCard from './components/ProfileCard'

import PasswordsCard from './components/Password/PasswordsCard'
import { Route, Routes } from 'react-router-dom'
import VaultsList from './components/Vault/VaultsList'

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
      <Routes>
        <Route path={'/*'} element={<VaultsList />} />
        <Route path={'/passwords'} element={<PasswordsCard />} />
      </Routes>
    </Box>
  )
}

export default Home
