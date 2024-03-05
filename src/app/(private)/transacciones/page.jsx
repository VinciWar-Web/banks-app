import { Box, Typography } from '@mui/material'
import { DataTable } from './components/DataTable'


export default function TransaccionesPage() {
  return (
    <Box>
      <Typography variant="h4">Listado de Transacciones</Typography>
      
      <DataTable />

    </Box>
  )
}