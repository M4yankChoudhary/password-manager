import {
  Box,
  Button,
  ListItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { Password } from '../../utils/interface/Interface'
import {
  HideSourceTwoTone,
  RemoveRedEye,
} from '@mui/icons-material'
import { useState } from 'react'
import CircularProgressCustom from './CircularProgressCustom'
import { ShowPasswordSchema, ShowPasswordType } from '../../utils/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  password?: Password
  onView: (vault?: Password) => void
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
}

const PasswordListItem = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [password, setPassword] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShowPasswordType>({ resolver: zodResolver(ShowPasswordSchema) })

  const onSubmit: SubmitHandler<ShowPasswordType> = async (data) => {
    try {
      setError("")
      setLoading(true)
      handleClose()
      setPassword('123456')
      reset({})
      setLoading(false)
      console.log(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error?.toString())
    }
  }

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
          <Typography
            component={'a'}
            color={'#549DF0'}
            href={props.password?.domain}
          >
            {props.password?.domain}
          </Typography>
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
          onClick={() => {
            props.onView(props.password)
            !password ? handleOpen() : setPassword('')
          }}
          px={'12px'}
          py={'8px'}
          borderRadius={'12px'}
          display={'flex'}
          gap={'12px'}
          sx={{ bgcolor: '#D6D6D65E', cursor: 'pointer' }}
        >
          <Typography fontSize={'16px'}>
            {hovered
              ? password
                ? password
                : 'Click to show password'
              : password
              ? password
              : '••••••••••••••••••••••••••••'}
          </Typography>
          {password ? <HideSourceTwoTone onClick={() => {console.log("Hello")}} /> : <RemoveRedEye />}
        </Box>
      </Box>
      {/* Password Reval Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={[
            {
              boxShadow:
                'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
              borderRadius: '24px',
              ...style,
            },
          ]}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Provide Master Key
          </Typography>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '24px',
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              className="inputRounded"
              placeholder="Master Key"
              type='password'
              variant="outlined"
              {...register('master_key')}
              size="small"
            />
            {errors.master_key && (
              <span className="error">{errors.master_key.message}</span>
            )}
            <Button
              type="submit"
              className="center"
              disabled={loading}
              sx={{
                borderRadius: '24px',
                height: '42px',
                bgcolor: 'black',
                ':hover': {
                  bgcolor: 'white',
                  color: 'black',
                  border: '1px solid black',
                },
              }}
              variant="contained"
            >
              Submit {loading && <CircularProgressCustom />}
            </Button>
            <span className="error">{error}</span>
          </form>
        </Box>
      </Modal>
    </ListItem>
  )
}

export default PasswordListItem
