import { useEffect, useState } from 'react'
import { Vault } from '../../utils/Interface'
import { APIService } from '../../Services/APIService'
import { Box, Card, TextField, Typography } from '@mui/material'
import VaultListItem from './VaultListItem'
import CreateVault from './CreateVault'

const VaultsList = () => {
  const [vaults, setVaults] = useState<Vault[]>([])
  const [search, setSearch] = useState<string>('')
  useEffect(() => {
    const getVaults = async () => {
      setVaults(await APIService.getAllVaults())
    }
    getVaults()
  }, [])
  const onChangeSearch = (e: string) => {
    setSearch(e)
  }
  return (
    <Card
      className="center"
      sx={{
        p: '24px',
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
        borderRadius: '16px',
        gap: '12px',
        width: {
          xs: '100%',
          sm: '500px',
          md: '800px',
          lg: '800px',
        },
      }}
    >
      <Box display={'flex'} flexDirection={'column'} width={1}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'12px'}
          >
            <Typography variant="h3">Vaults</Typography>

            <CreateVault />
          </Box>

          <Box>
            <TextField
              value={search}
              onChange={(e) => onChangeSearch(e.target.value)}
              className="inputRounded"
              placeholder="Search"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
        <Typography p={'6px'} fontSize={'16px'}>
          Select an existing vault or create a new one.
        </Typography>
        <Box
          marginTop={'24px'}
          sx={{
            gap: '12px',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {vaults.map((v) => (
            <VaultListItem vault={v} />
          ))}
          {vaults.map((v) => (
            <VaultListItem vault={v} />
          ))}
          {vaults.map((v) => (
            <VaultListItem vault={v} />
          ))}
          {vaults.map((v) => (
            <VaultListItem vault={v} />
          ))}
          {vaults.map((v) => (
            <VaultListItem vault={v} />
          ))}
        </Box>
      </Box>
    </Card>
  )
}

export default VaultsList
