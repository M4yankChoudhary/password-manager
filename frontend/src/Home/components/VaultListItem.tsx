import {Chip, Typography } from '@mui/material'
import { Vault } from '../../utils/Interface'

type Props = {
  vault?: Vault
}

const VaultListItem = (props: Props) => {
  return (
    <Chip
      sx={{
        boxShadow:
          'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px',
        border: 'none',
        cursor: 'pointer',
        ':hover': {
            bgcolor: 'black',
            color:'white'
        }
      }}
      label={<Typography>{props.vault?.name}</Typography>}
      variant="outlined"
    />
  )
}

export default VaultListItem
