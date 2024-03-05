"use client"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { LinearProgress } from '@mui/material'
import { useRouter } from 'next/navigation'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
}

export const ModalRegisterLink = ({ setOpen, open, institution, setOpenSnakbar, setOpenSnakbarError }) => {

    const [buttonDisable, setButtonDisable] = useState(false)

    const handleClose = () => setOpen(false)

    const router = useRouter()


    const handleSubmit = async () => {

        setButtonDisable(true)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic Y2E3OGVhZjEtNDg0My00NjAwLTg3MTMtOTRkMGRjMmE3NDU5OnNwbmpud21qZHJMSnZvM1Jia3owUWtCSGtAcWxWTm9jSXYzOG9aVWF1ZDBpRGhAeUBWeXNXa0NjWEA3czVwZUw=")

        const raw = JSON.stringify({
            "institution": institution,
            "username": "bnk100",
            "password": "full"
        })

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        }

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_SANDBOX}/links/`, requestOptions)

            setOpen(false)
            setButtonDisable(false)
            if(response.ok){
                setOpenSnakbar(true)
                setTimeout(() => {
                    router.push("/links")
                }, 1000)
            }else{
                setOpenSnakbarError(true)
            }

            setTimeout(() => {
                setOpenSnakbar(false)
                setOpenSnakbarError(false)
            }, 3000)

        } catch (error) {
            setButtonDisable(false)
            throw error

        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: 'center' }} id="modal-modal-title">
                        ¿Está seguro de crear un nuevo Link con este Banco?
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <Button disabled={buttonDisable} onClick={handleSubmit} sx={{marginRight: '5px'}} variant="contained" color="primary">Si</Button>
                        <Button disabled={buttonDisable} onClick={handleClose} sx={{marginLeft: '5px'}} variant="outlined" color="primary">No</Button>
                    </Box>

                </Box>


            </Modal>

            {/* Spinner */}
            <Box 
                sx={{    
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: '9999'
                }}
            >
                {
                    buttonDisable && <LinearProgress />
                }  
            </Box>
        </div>
    )
}