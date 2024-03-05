import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { UserForm } from './components/UserForm'

export default function MyUserPage() {
    return (
      <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: {
                      sm: '400px',
                      xs: '300px',
                  },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            width: '140px',
                            height: '140px',
                            marginBottom: '20px'
                        }}
                    >
                            <Image
                                style={{
                                    borderRadius: '50%',
                                }}
                                priority 
                                src="/imgLogin.jpg" 
                                alt="User Avatar" 
                                width={150}
                                height={150}
                            />
                    </Box>
                </Box>
                <Typography
                    sx={{ 
                        fontSize: '30px', 
                        marginBottom: '20px' 
                    }}>
                        Editar Usuario
                </Typography>

                {/* Actions Inputs */}
                < UserForm />

            </Box>
        </Box>
      </>
    )
}