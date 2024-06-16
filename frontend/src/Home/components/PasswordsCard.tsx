import { ArrowBackIos } from '@mui/icons-material'
import { Box, Card, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Password } from '../../utils/interface/Interface'
import { APIService } from '../../Services/APIService'
import CreatePassword from './CreatePassword'
import PasswordListItem from './PasswordListItem'

const PasswordsCard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { vault } = location.state

  const [passwords, setPasswords] = useState<Password[]>([])

  useEffect(() => {
    getPasswords()
  }, [])

  const getPasswords = async () => {
    setPasswords(await APIService.getPasswords(vault?._id))
  }

  const [search, setSearch] = useState<string>('')
  const onChangeSearch = (e: string) => {
    setSearch(e)
  }

  return (
    <Card
      className="center"
      sx={{
        p: '24px',
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
        borderRadius: '16px',
        gap: '12px',
        width: {
          xs: '100%',
          sm: '500px',
          md: '800px',
          lg: '800px',
        },
      }}
    >
      <Box display={'flex'} flexDirection={'column'} width={1}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'12px'}
          >
            <ArrowBackIos
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(-1)
              }}
            />{' '}
            <Typography fontSize={'24px'}>{vault?.name}</Typography>
            <CreatePassword
              vaultId={vault?._id}
              onSubmit={async () => {
                await getPasswords()
              }}
            />
          </Box>

          <Box>
            <TextField
              value={search}
              onChange={(e) => onChangeSearch(e.target.value)}
              className="inputRounded"
              placeholder="Search"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
        <Typography p={'6px'} fontSize={'16px'}>
          {vault?.description}
        </Typography>
        <Box >
        {passwords.map((v) => (
         <PasswordListItem onView={() => {}} password={v}/>
        ))}
        </Box>
        
      </Box>
    </Card>
  )
}

export default PasswordsCard
