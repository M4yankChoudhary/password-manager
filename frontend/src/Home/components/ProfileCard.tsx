import { Box, Button, Card, Typography } from '@mui/material'
import { User } from '../../utils/interface/Interface'
import { removeAccessToken } from '../../App'
import { useAppContext } from '../../AppContext'

type Props = {
  user?: User
}

const ProfileCard = (props: Props) => {
  const { setIsLoggedIn } = useAppContext()
  return (
    <Box display={'flex'} py={'24px'}>
      <Card
        className="center"
        sx={{
          px: '16px',
          py: '16px',
          boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
          borderRadius: '16px',
          gap: '12px',
        }}
      >
        <img
          width={'32px'}
          height={'32px'}
          style={{ borderRadius: '50%' }}
          src={props.user?.picture}
        />
        <Typography>{props?.user?.name}</Typography>
        <Button
        sx={{
            bgcolor:"black",
            color:'white',
            borderRadius:"24px",
            px:"12px",
            ':hover': {
                color:'black',
                boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
            }
        }}
          onClick={() => {
            removeAccessToken()
            setIsLoggedIn!(false)
          }}
        >
          Logout
        </Button>
      </Card>
    </Box>
  )
}

export default ProfileCard
