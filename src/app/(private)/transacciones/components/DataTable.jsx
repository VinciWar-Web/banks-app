"use client"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export const DataTable = () => {

    const { transactionsAll = [] } = useSelector( (state) => state.transactionsReducer)

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                <TableContainer sx={{background: '#efefef', maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ fontWeight: 'bold' }}>
                                <TableCell>Status</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Categoria</TableCell>
                                <TableCell>Divisa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                transactionsAll.map( transactions => (
                                    <TableRow key={transactions.id}>
                                        <TableCell>{transactions.status}</TableCell>
                                        <TableCell>{transactions.type}</TableCell>
                                        <TableCell>{transactions.category}</TableCell>
                                        <TableCell>{transactions.currency}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {    
                Array.isArray(transactionsAll) && transactionsAll.length === 0 && 
                <Typography sx={{textAlign: 'center', marginTop: '20px'}}>No hay una lista de transacciones disponible. Por favor, dirígete a la sección de <strong>Links</strong> y haz clic en <strong>'Ver Transacciones'</strong> para acceder a la información deseada.</Typography>
            }
        </>
    )
}