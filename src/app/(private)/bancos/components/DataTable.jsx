"use client"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Alert, Button, Snackbar } from '@mui/material'
import { ModalRegisterLink } from './ModalRegisterLink'
import { useState } from 'react'


export const DataTable = ({ dataBancks = [] }) => {

    const [open, setOpen] = useState(false)
    const [institution, setInstitution] = useState('')
    const [openSnakbar, setOpenSnakbar] = useState(false)
    const [openSnakbarError, setOpenSnakbarError] = useState(false)

    const handleInstitution = ( institutionName ) => {
        setOpen(true)
        setInstitution(institutionName)
    }

    return (
        <>
            {/* Modal de registro de nuevo LINK */}
            <ModalRegisterLink setOpen={setOpen} open={open} institution={institution} setOpenSnakbar={setOpenSnakbar} setOpenSnakbarError={setOpenSnakbarError} />

            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                <TableContainer sx={{background: '#efefef', maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ fontWeight: 'bold' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Banco</TableCell>
                                <TableCell>País</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell align="right">Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataBancks.map( banck => (
                                    <TableRow key={banck.id}>
                                        <TableCell>{banck.id}</TableCell>
                                        <TableCell>{banck.display_name}</TableCell>
                                        <TableCell>{banck.country_code}</TableCell>
                                        <TableCell>{banck.type}</TableCell>
                                        <TableCell 
                                            align="right"
                                        >
                                            <Button 
                                                onClick={ ()=> handleInstitution(banck.name)  }
                                                variant="contained"
                                            >
                                                Registrar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Snackbar open={openSnakbar} autoHideDuration={3000} >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%', zIndex: '999' }}
                >
                    Registro Exitoso
                </Alert>
            </Snackbar>

            <Snackbar open={openSnakbarError} autoHideDuration={2000} >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Algo salio mal
                </Alert>
            </Snackbar>
        </>
    )
}