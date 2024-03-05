"use client"

import { useEffect, useState } from 'react'
import { Alert, Box, Button, InputLabel, LinearProgress, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { signIn } from 'next-auth/react'
import { useSelector } from 'react-redux'

const initialState = {
    nameUser: '',
    emailUser: '',
    uidUser: ''
}

export const UserForm = () => {

    const { myUser = [] } = useSelector( (state) => state.myUserReducer )

    const [valueData, setValueData] = useState(initialState)
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const [errors, setErrors] = useState('')
    const [successFul, setSuccessFul] = useState(false)

    const [spinnerActive, setSpinnerActive] = useState(false)
    const router = useRouter()

    //Expresión regular que valida el correo valido
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value)
    }

    const handleInputChange = ({ target }) => {
        setValueData({
            ...valueData,
            [target.name]: target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSpinnerActive(true)

        //Validamos el nombre
        if(!/^[a-zA-Z\s]*$/.test(valueData.nameUser)){
            setNameError('El nombre solo puede contener letras')
            setSpinnerActive(false)
            return
        }else{
            setNameError('')
        }

        //Validamos el input usuario
        if (!validateEmail(valueData.emailUser)) {
            setEmailError('Ingresa un correo electrónico válido')
            setSpinnerActive(false)
            return
        } else {
            setEmailError('');
        }

        //Validamos el input contraseña
        if (password < 6) {
            setPasswordError('La contraseña debe de tener al menos 6 dígitos')
            setSpinnerActive(false)
            return
        } else {
            setPasswordError('');
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        const raw = JSON.stringify({
            "name": valueData.nameUser,
            "email": valueData.emailUser,
            "password": password,
            "img": "",
            "rol": rol,
            "state": true,
            "google": false
        })

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${valueData.uidUser}`, requestOptions)


        if (!res.ok) {
            setSpinnerActive(false)
            setErrors('Algo salio mal')
            setTimeout(() => {
                setErrors('')  
            }, 2000);
            return;
        }

        setSuccessFul(true)

        const responseNextAuth = await signIn("credentials", {
            email: valueData.emailUser,
            password,
            redirect: false,
        })

        //Detemos el acceso y enviamos el error
        if (responseNextAuth?.status === 401) {
            setSpinnerActive(false)
            return
        }
        setSpinnerActive(false)
        setTimeout(() => {
            router.push("/bancos")
        }, 1500);
    }

    // Estado para agregar data inicial
    useEffect(() => {
        if(typeof myUser === 'object' && myUser !== null && Object.keys(myUser).length > 0){
            setValueData({
                nameUser: myUser.name,
                emailUser: myUser.email,
                uidUser: myUser.uid
            })
            setRol(myUser.rol)
        }else{
            setValueData(initialState)
            setRol('')
        }

    }, [myUser])

    useEffect(() => {
        if( 
            valueData.nameUser === myUser.name && 
            valueData.emailUser === myUser.email &&
            rol === myUser.rol &&
            password.length <= 6
        ){
            setDisableButton(true)
        }else{
            setDisableButton(false)
        }
    }, [valueData, myUser, password, rol])
    
    
    //Cierra el Alert
    setTimeout(() => {
        setErrors('')
    }, 4000);

    return (
        <>

            {/* Spinner */}
            <Box 
                sx={{    
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                }}
            >
                {
                    spinnerActive && <LinearProgress />
                }  
            </Box>

            <TextField
                sx={{ 
                    marginBottom: '20px', 
                    width: '100%',
                }}
                id="nameUser"
                name="nameUser"
                label="Nombre completo"
                variant="outlined"
                error={!!nameError}
                helperText={ nameError }
                value={valueData.nameUser || ''}
                onChange={ handleInputChange }
            />

            <TextField
                sx={{ 
                    marginBottom: '20px', 
                    width: '100%',
                }}
                id="emailUser"
                name="emailUser"
                label="Correo electronico"
                variant="outlined"
                error={!!emailError}
                helperText={emailError}
                value={valueData.emailUser || ''}
                onChange={ handleInputChange }
            />

            <TextField
                sx={{ 
                    marginBottom: '20px',
                    width: '100%', 
                }}
                id="password"
                label="Contraseña"
                variant="outlined"
                type="password"
                error={!!passwordError}
                helperText={passwordError}
                onChange={ (e) => setPassword(e.target.value) }
            />

            {
                rol === 'ADMIN_ROLE' && (
                    <>
                        <InputLabel id="simple-select-label">Rol</InputLabel>
                        <Select
                            sx={{
                                marginBottom: '20px'
                            }}
                            labelId="simple-select-label"
                            id="simple-select"
                            value={rol}
                            variant="outlined"
                            onChange={({ target }) => setRol(target.value)}
                        >
                            <MenuItem value={'ADMIN_ROLE'}>Administrador</MenuItem>
                            <MenuItem value={'USER_ROLE'}>Usuario</MenuItem>
                        </Select>
                    </>
                )
            }

            <Button
                sx={{
                    marginBottom: '20px'
                }} 
                disabled={disableButton}
                size="large" 
                variant="contained"
                onClick={ handleSubmit }
            >
                Editar
            </Button>

            <Link 
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    textAlign: 'center'
                }}
                href="/bancos"
            >
                Atras
            </Link>


            <Snackbar open={successFul} autoHideDuration={3000} >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%', zIndex: '999' }}
                >
                    Usuario actualizado con exito
                </Alert>
            </Snackbar>

            {/* Alerta de error */}
            <Box 
                sx={{    
                    position: 'fixed',
                    bottom: 10,
                    left: 10,
                    width: {
                        sm: '390px',
                        xs: '300px',
                    },
                }}
            >
                {
                    errors && <Alert severity="error">{ errors }</Alert>
                }  
            </Box>
        </>
    )
}
