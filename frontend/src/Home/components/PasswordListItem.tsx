import { Box, ListItem, Typography } from '@mui/material'
import { Password } from '../../utils/interface/Interface'
import { RemoveRedEye } from '@mui/icons-material'
import { useState } from 'react'

type Props = {
  password?: Password
  onView: (vault?: Password) => void
}

const PasswordListItem = (props: Props) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <ListItem
      sx={{
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
        marginTop: '12px',
        borderRadius: '12px',
        // border: '1px solid #D6D6D66E',
        pb: '16px',

        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
      className="center"
    >
      <Box
        display={'flex'}
        width={1}
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <Typography
          sx={{
            fontSize: '12px',
            py: '8px',
          }}
        >
          Username
        </Typography>
        <Box
          px={'12px'}
          py={'8px'}
          borderRadius={'12px'}
          sx={{ bgcolor: '#D6D6D65E' }}
        >
          <Typography>{props.password?.username}</Typography>
        </Box>
      </Box>
      <Box
        display={'flex'}
        width={1}
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <Typography
          sx={{
            fontSize: '12px',
            py: '8px',
          }}
        >
          Domain
        </Typography>
        <Box
          px={'12px'}
          py={'8px'}
          borderRadius={'12px'}
          sx={{ bgcolor: '#D6D6D65E' }}
        >
          <Typography component={'a'} color={"#549DF0"} href={props.password?.domain}>{props.password?.domain}</Typography>
        </Box>
      </Box>
      <Box
        display={'flex'}
        width={1}
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <Typography
          sx={{
            fontSize: '12px',
            py: '8px',
          }}
        >
          Password
        </Typography>
        <Box
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
          onClick={() => props.onView(props.password)}
          px={'12px'}
          py={'8px'}
          borderRadius={'12px'}
          display={'flex'}
          gap={'12px'}
          sx={{ bgcolor: '#D6D6D65E', cursor: 'pointer' }}
        >
         <Typography fontSize={"16px"}>{hovered ? 'Click to show password' : '••••••••••••••••••••••••••••'}</Typography>
          <RemoveRedEye />
        </Box>
      </Box>
    </ListItem>
  )
}

export default PasswordListItem
