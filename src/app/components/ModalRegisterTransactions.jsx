"use client"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startTransactions } from '@/store/transactions/transactionsSlice'
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

export const ModalRegisterTransactions = ({ setOpenTransactions, openTransactions, linkID, setOpenSnakbar, setOpenSnakbarError }) => {

    const [buttonDisable, setButtonDisable] = useState(false)
    const [dataTransactions, setDataTransactions] = useState([])

    const dispatch = useDispatch()

    const handleClose = () => setOpenTransactions(false)

    const router = useRouter()

    const handleAccounts = async () => {

        setButtonDisable(true)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic Y2E3OGVhZjEtNDg0My00NjAwLTg3MTMtOTRkMGRjMmE3NDU5OnNwbmpud21qZHJMSnZvM1Jia3owUWtCSGtAcWxWTm9jSXYzOG9aVWF1ZDBpRGhAeUBWeXNXa0NjWEA3czVwZUw=")

        const raw = JSON.stringify({
            "link": "05b74e15-8fe1-42e8-a992-9a0f5098b0d9",
            "date_from": "2024-02-15",
            "date_to": "2024-03-01"
        })

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        }

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_SANDBOX}/transactions/`, requestOptions)
            const data = await response.json()

            if(response.ok){
                setOpenSnakbar(true)
                setDataTransactions(data)
                setTimeout(() => {
                    router.push("/transacciones")
                }, 1000)
            }else{
                setOpenSnakbarError(true)
                setDataTransactions([])
            }


            setOpenTransactions(false)
            setOpenSnakbar(true)
            setButtonDisable(false)

            
            setTimeout(() => {
                setOpenSnakbar(false)
            }, 3000)

        } catch (error) {
            setButtonDisable(false)
            throw error

        }
    }

    useEffect(() => {
        dispatch(startTransactions(dataTransactions))
    }, [dataTransactions])
    

    return (
        <div>
            <Modal
                open={openTransactions}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: 'center' }} id="modal-modal-title">
                        ¿Está seguro que deseas ver información de transacciones?
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        
                        <Button disabled={buttonDisable} onClick={handleAccounts} sx={{marginRight: '5px'}} variant="contained" color="primary">Si</Button>
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