"use client"

import { useState } from 'react'
import { Alert, Box, Button, LinearProgress, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { signIn } from 'next-auth/react'

export const RegisterForm = () => {

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSpinnerActive(true)

        //Validamos el nombre
        if(!/^[a-zA-Z\s]*$/.test(name)){
            setNameError('El nombre solo puede contener letras')
            setSpinnerActive(false)
            return
        }else{
            setNameError('')
        }

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

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
                img:'',
                rol: 'USER_ROLE',
              }),
            }
        )

        console.log(res)
        if (!res.ok) {
            setErrors('Error al registrar, intenta de nuevo')
            setSpinnerActive(false)
            return;
        }

        const responseNextAuth = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        //Detemos el acceso y enviamos el error
        if (responseNextAuth?.status === 401) {
            setSpinnerActive(false)
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
                id="name"
                label="Nombre completo"
                variant="outlined"
                error={!!nameError}
                helperText={ nameError }
                onChange={ (e) => setName(e.target.value) }
            />

            <TextField
                sx={{ 
                    marginBottom: '20px', 
                    width: '100%',
                }}
                id="email"
                label="Correo electronico"
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
                helperText={passwordError}
                onChange={ (e) => setPassword(e.target.value) }
            />

            <Button
                sx={{
                    marginBottom: '20px'
                }} 
                disabled={spinnerActive}
                size="large" 
                variant="contained"
                onClick={ handleSubmit }
            >
                Registrar
            </Button>

            <Link 
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    textAlign: 'center'
                }}
                href="/login"
            >
                Iniciar sesión
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
