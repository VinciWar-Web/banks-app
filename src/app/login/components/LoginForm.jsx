"use client"

import { useState } from 'react'
import { Alert, Box, Button, LinearProgress, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { signIn } from 'next-auth/react'

export const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [errors, setErrors] = useState('')
    const [spinnerActive, setSpinnerActive] = useState(false)
    const router = useRouter()

    //Expresión regular que valida el correo valido
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }

    //Enviamos los datos para hacer login
    const handleSubmit = async (e) => {
        e.preventDefault()

        setSpinnerActive(true)

        //Validamos el input usuario
        if (!validateEmail(email)) {
            setEmailError('Ingresa un correo electrónico válido')
            setSpinnerActive(false)
            return
        } else {
            setEmailError('');
        }

        //Validamos el input contraseña
        if (password.length < 6) {
            setPasswordError('La contraseña debe de tener al menos 6 dígitos')
            setSpinnerActive(false)
            return
        } else {
            setPasswordError('');
        }
    
        //Iniciamos el login
        const responseNextAuth = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        
        //Si existe un error al hacer login, detemos el acceso y enviamos el error
        if (responseNextAuth?.status === 401) {
            setSpinnerActive(false)
            setErrors('Error al autenticar')
            return
        }

        setErrors('')
        router.push("/bancos")
        setSpinnerActive(false)

    }

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
                id="user"
                label="Usuario"
                variant="outlined"
                error={!!emailError}
                helperText={emailError}
                onChange={ (e) => setEmail(e.target.value) }
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
                helperText={ passwordError }
                onChange={ (e) => setPassword(e.target.value) }
            />

            <Button
                sx={{
                    marginBottom: '20px'
                }} 
                size="large" 
                variant="contained"
                onClick={ handleSubmit }
                disabled={spinnerActive}
            >
                Ingresar
            </Button>

            <Link 
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    textAlign: 'center',
                    marginBottom: '10px'
                }}
                href="/register"
            >
                Crear una nueva cuenta
            </Link>


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
