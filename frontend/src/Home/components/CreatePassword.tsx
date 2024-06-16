import { useState } from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreatePasswordSchema, CreatePasswordType } from '../../utils/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import CircularProgressCustom from './CircularProgressCustom'
import { APIService } from '../../Services/APIService'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
}

interface CreateVaultProps {
  vaultId: string
  onSubmit: () => void
}

const CreatePassword = (props: CreateVaultProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePasswordType>({ resolver: zodResolver(CreatePasswordSchema) })

  const onSubmit: SubmitHandler<CreatePasswordType> = async (data) => {
    try {
      setError("")
      setLoading(true)
      await APIService.createPassword({
        username: data.username,
        domain: data.domain,
        encrypted_password: data.encrypted_password,
        vault_id: props.vaultId
      })
      props.onSubmit()
      setLoading(false)
      setOpen(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      setError(error?.toString())
    }
    console.log(data)
  }
  return (
    <Box>
      <Button
        onClick={handleOpen}
        className="center"
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
        <Typography fontSize={'16px'} textTransform={'none'}>
          +
        </Typography>
      </Button>
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
            New Password
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
              placeholder="Username"
              variant="outlined"
              {...register('username')}
              size="small"
            />
            {errors.username && <span className='error'>{errors.username.message}</span>}
            <TextField
              className="inputRounded"
              placeholder="Domain"
              variant="outlined"
              {...register('domain')}
              size="small"
            />
            {errors.domain && <span className='error'>{errors.domain.message}</span>}
            <TextField
              className="inputRounded"
              placeholder="Password"
              variant="outlined"
              type="password"
              {...register('encrypted_password')}
              size="small"
            />
            {errors.encrypted_password && <span className='error'>{errors.encrypted_password.message}</span>}
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
               Add {loading && <CircularProgressCustom/>}
            </Button>
            <span className='error'>{error}</span>
          </form>
        </Box>
      </Modal>
    </Box>
  )
}

export default CreatePassword
