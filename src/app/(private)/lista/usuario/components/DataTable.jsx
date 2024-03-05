"use client"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Alert, Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import { ModalDeleteUser } from '@/app/components/ModalDeleteUser'
import { useSession } from 'next-auth/react'

export const DataTable = ({ dataUsers = [] }) => {

    const { data: session } = useSession()

    // Logica para no mostrar el usuario logueado
    const currentUserUid = session?.user?.user?.uid
    const filteredUsers = dataUsers.filter(user => user.uid !== currentUserUid)

    const [open, setOpen] = useState(false)
    const [uid, setUDI] = useState('')
    const [openSnakbar, setOpenSnakbar] = useState(false)
    const [openSnakbarError, setOpenSnakbarError] = useState(false)

    const handleDelete = ( id ) => {
        setOpen(true)
        setUDI(id)
    }

    return (
        <>
            {/* Modal de registro de nuevo LINK */}
            <ModalDeleteUser setOpen={setOpen} open={open} uid={uid} setOpenSnakbar={setOpenSnakbar} setOpenSnakbarError={setOpenSnakbarError} />
            
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                <TableContainer sx={{background: '#efefef', maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ fontWeight: 'bold' }}>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell align="right">Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                filteredUsers.map( user => (
                                    <TableRow key={user.uid}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.rol === "ADMIN_ROLE" ? "Administrador" : "Usuario"}</TableCell>
                                        <TableCell 
                                            align="right"
                                        >
                                            <Button 
                                                onClick={ ()=> handleDelete(user.uid)  }
                                                color="secondary"
                                                variant="outlined"
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

            <Snackbar open={openSnakbar} autoHideDuration={3000} >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%', zIndex: '999' }}
                >
                    Usuario eliminado con exitoso
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