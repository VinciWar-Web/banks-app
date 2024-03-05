"use client"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Alert, Button, Snackbar, Typography } from '@mui/material'
import { useState } from 'react'


import { ModalDeleteLink } from './ModalDeleteLink'
import { ModalRegisterTransactions } from './ModalRegisterTransactions'
import { ModalRegisterAccounts } from './ModalRegisterAccounts'

export const DataTable = ({ dataLinks = [] }) => {

    const [openAccounts, setOpenAccounts] = useState(false)
    const [openTransactions, setOpenTransactions] = useState(false)
    const [openDeleteLink, setOpenDeleteLink] = useState(false)
    const [linkID, setLinkID] = useState('')
    const [openSnakbar, setOpenSnakbar] = useState(false)
    const [openSnakbarError, setOpenSnakbarError] = useState(false)

    const handleAccounts = ( linkID ) => {
        setOpenAccounts(true)
        setLinkID(linkID)
    }

    const handleTransactions = ( linkID ) => {
        setOpenTransactions(true)
        setLinkID(linkID)
    }

    const handleDelet = ( linkID ) => {
        setOpenDeleteLink(true)
        setLinkID(linkID)
    }

    return (
        <>
            {/* Modal de registro de nuevo LINK */}
            <ModalRegisterAccounts setOpenAccounts={setOpenAccounts} openAccounts={openAccounts} linkID={linkID} setOpenSnakbar={setOpenSnakbar} />
            <ModalRegisterTransactions setOpenTransactions={setOpenTransactions} openTransactions={openTransactions} linkID={linkID} setOpenSnakbar={setOpenSnakbar} setOpenSnakbarError={setOpenSnakbarError} />
            <ModalDeleteLink setOpenDeleteLink={setOpenDeleteLink} openDeleteLink={openDeleteLink} linkID={linkID} setOpenSnakbar={setOpenSnakbar} setOpenSnakbarError={setOpenSnakbarError} />
            
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                <TableContainer sx={{background: '#efefef', maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ fontWeight: 'bold' }}>
                                <TableCell>Institution</TableCell>
                                <TableCell>Frecuencia de actualización</TableCell>
                                <TableCell align="right">Acción Cuentas</TableCell>
                                <TableCell align="right">Acción Transacciones</TableCell>
                                <TableCell align="right">Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataLinks.map( link => (
                                    <TableRow key={link.id}>
                                        <TableCell>{link.institution}</TableCell>
                                        <TableCell>{link.refresh_rate}</TableCell>
                                        <TableCell 
                                            align="right"
                                        >
                                            <Button 
                                                onClick={ ()=> handleTransactions(link.id)  }
                                                variant="contained"
                                            >
                                                ver transacciones
                                            </Button>
                                        </TableCell>
                                        <TableCell 
                                            align="right"
                                        >
                                            <Button 
                                                onClick={ ()=> handleAccounts(link.id)  }
                                                variant="contained"
                                            >
                                                registrar cuentas
                                            </Button>
                                        </TableCell>
                                        <TableCell 
                                            align="right"
                                        >
                                            <Button 
                                                onClick={ ()=> handleDelet(link.id)  }
                                                variant="outlined"
                                                color="secondary"
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {    
                Array.isArray(dataLinks) && dataLinks.length === 0 && 
                    <Typography sx={{textAlign: 'center', marginTop: '20px'}}>No hay una lista de enlaces disponible. Por favor, dirígete a la sección de <strong>BANCOS</strong> y haz clic en <strong>'Registrar'</strong> para acceder a la información deseada.</Typography>
            }

            <Snackbar open={openSnakbar} autoHideDuration={3000} >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
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