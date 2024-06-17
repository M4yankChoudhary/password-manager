import { ListItem, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import { Vault } from '../../../utils/interface/Interface'

type Props = {
  vault?: Vault
  onDelete: (vault?: Vault) => void
}

const VaultListItem = (props: Props) => {
  const navigate = useNavigate()
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
      <Typography
      flex={1}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate('/passwords', { state: { vault: props.vault } })
        }}
      >
        {props.vault?.name}
      </Typography>
      <Delete sx={{ cursor: 'pointer', }} onClick={() => {props.onDelete(props.vault)}} />
    </ListItem>
  )
}

export default VaultListItem
