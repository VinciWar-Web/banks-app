"use client"

import "dayjs/locale/es"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { LinearProgress, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startTransactions } from '@/store/transactions/transactionsSlice'
import { useRouter } from 'next/navigation'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

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

const initialDate = dayjs('2024-01-01')

export const ModalRegisterTransactions = ({ setOpenTransactions, openTransactions, linkID, setOpenSnakbar, setOpenSnakbarError }) => {

    const [buttonDisable, setButtonDisable] = useState(false)
    const [dataTransactions, setDataTransactions] = useState([])
    const [startDate, setStartDate] = useState(initialDate)
    const [startEnd, setStartEnd] = useState(null)
    const [disableButton, setDisableButton] = useState(false)
    
    const dispatch = useDispatch()

    const handleClose = () => setOpenTransactions(false)

    const router = useRouter()


    const handleStartDateChange = (date) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setStartEnd(date)
    }

    const handleAccounts = async () => {

        setButtonDisable(true)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic Y2E3OGVhZjEtNDg0My00NjAwLTg3MTMtOTRkMGRjMmE3NDU5OnNwbmpud21qZHJMSnZvM1Jia3owUWtCSGtAcWxWTm9jSXYzOG9aVWF1ZDBpRGhAeUBWeXNXa0NjWEA3czVwZUw=")

        const raw = JSON.stringify({
            "link": linkID,
            "date_from": dayjs(startDate).format('YYYY-MM-DD'),
            "date_to": dayjs(startEnd).format('YYYY-MM-DD')
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
        if(startEnd){
            setDisableButton(false)
        }else{
            setDisableButton(true)
        }
    }, [startEnd])
    

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

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}>

                                <DatePicker 
                                    sx={{marginBottom: '20px'}}
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    label='Año - Mes - Día'
                                    textField={
                                        <TextField
                                          label="Seleccionar fecha"
                                          variant="outlined"
                                          size="small"
                                        />
                                    }
                                />


                                <DatePicker 
                                    sx={{marginBottom: '20px'}}
                                    value={startEnd}
                                    onChange={handleEndDateChange}
                                    label='Año - Mes - Día'
                                    textField={
                                        <TextField
                                          label="Seleccionar fecha"
                                          variant="outlined"
                                          size="small"
                                        />
                                    }
                                />
                           
                        </Box>
                    </LocalizationProvider>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        
                        <Button disabled={disableButton} onClick={handleAccounts} sx={{marginRight: '5px'}} variant="contained" color="primary">Si</Button>
                        <Button onClick={handleClose} sx={{marginLeft: '5px'}} variant="outlined" color="primary">No</Button>
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