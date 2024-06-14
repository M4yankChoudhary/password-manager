import Lottie from 'react-lottie'
import loadingAnim from '../assets/loading.json'
import { Box } from '@mui/material'
const Loader = ({ minHeight = '250px' }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '-1',
        minHeight: minHeight,
      }}
    >
      <Lottie options={defaultOptions} height={'250px'} width={'250px'} />
    </Box>
  )
}

export default Loader
