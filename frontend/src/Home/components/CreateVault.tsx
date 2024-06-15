import { useState } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
}

const CreateVault = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          Add a new vault
        </Typography>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={[
            {
              boxShadow:
                'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
                borderRadius:'24px',
              ...style,
            },
          ]}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new vault
          </Typography>
        </Box>
      </Modal>
    </Box>
  )
}

export default CreateVault
