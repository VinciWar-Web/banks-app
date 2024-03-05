"use client"
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'

export const DataTable = ({ dataAccounts = [] }) => {

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                <TableContainer sx={{background: '#efefef', maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ fontWeight: 'bold' }}>
                                <TableCell>Agencia</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Numero</TableCell>
                                <TableCell>Categoria</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                dataAccounts.map( accounts => (
                                    <TableRow key={accounts.id}>
                                        <TableCell>{accounts.agency}</TableCell>
                                        <TableCell>{accounts.name}</TableCell>
                                        <TableCell>{accounts.number}</TableCell>
                                        <TableCell>{accounts.category}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>


            {    
                Array.isArray(dataAccounts) && dataAccounts.length === 0 && 
                    <Typography sx={{textAlign: 'center', marginTop: '20px'}}>No hay una lista de cuentas disponible. Por favor, dirígete a la sección de <strong>Links</strong> y haz clic en <strong>'Registrar Cuentas'</strong> para acceder a la información deseada.</Typography>
            }
        </>
    )
}