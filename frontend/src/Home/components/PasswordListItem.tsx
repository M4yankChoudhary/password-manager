import { Box, ListItem, Typography } from '@mui/material'
import { Password } from '../../utils/interface/Interface'
import { Delete, RemoveRedEye } from '@mui/icons-material'

type Props = {
  password?: Password
  onView: (vault?: Password) => void
}

const PasswordListItem = (props: Props) => {
  return (
    <ListItem
      sx={{
        ':hover': {
          borderRadius: '12px',
          bgcolor: '#D6D6D65E',
        },
        justifyContent: 'space-between',
      }}
      className="center"
    >
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Typography sx={{
          py:'8px'
        }}>Username</Typography>
        <Box
          px={'12px'}
          py={'8px'}
          borderRadius={'12px'}
          sx={{ bgcolor: '#D6D6D65E' }}
        >
          <Typography>{props.password?.username}</Typography>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Typography sx={{
          py:'8px'
        }}>Domain</Typography>
        <Box
          px={'12px'}
          py={'8px'}
          borderRadius={'12px'}
          sx={{ bgcolor: '#D6D6D65E' }}
        >
          <Typography>{props.password?.domain}</Typography>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Typography sx={{
          py:'8px'
        }}>Domain</Typography>
        <Box
          px={'12px'}
          py={'8px'}
          borderRadius={'12px'}
          sx={{ bgcolor: '#D6D6D65E' }}
        >
          <Typography>{props.password?.domain}</Typography>
        </Box>
      </Box>
    </ListItem>
  )
}

export default PasswordListItem
