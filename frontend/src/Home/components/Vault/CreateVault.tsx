import { useState } from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { CreateVaultSchema, CreateVaultType } from '../../../utils/types/types'
import { APIService } from '../../../Services/APIService'
import CircularProgressCustom from '../CircularProgressCustom'


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
  onSubmit: () => void
}

const CreateVault = (props: CreateVaultProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVaultType>({ resolver: zodResolver(CreateVaultSchema) })

  const onSubmit: SubmitHandler<CreateVaultType> = async (data) => {
    try {
      setError("")
      setLoading(true)
      await APIService.createVault({
        name: data.name,
        master_key: data.master_key,
        description: data.description
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
            Create a new vault
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
              placeholder="Give your vault a name"
              variant="outlined"
              {...register('name')}
              size="small"
            />
            {errors.name && <span className='error'>{errors.name.message}</span>}
            <TextField
              className="inputRounded"
              placeholder="Write something about this vault."
              variant="outlined"
              {...register('description')}
              size="small"
            />
            {errors.description && <span className='error'>{errors.description.message}</span>}
            <TextField
              className="inputRounded"
              placeholder="Provide a Master Key"
              variant="outlined"
              type="password"
              {...register('master_key')}
              size="small"
            />
            {errors.master_key && <span className='error'>{errors.master_key.message}</span>}
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

export default CreateVault
