'use client'

import { useState } from 'react'
import PaymentsIcon from '@mui/icons-material/Payments'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { AccountCircle } from '@mui/icons-material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LinkIcon from '@mui/icons-material/Link'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { 
    Box, 
    Divider, 
    Drawer, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Typography, 
    Toolbar, 
    AppBar, 
    Menu,
    MenuItem
} from '@mui/material'

import { signOut, useSession } from 'next-auth/react'
import { startMyUser } from '@/store/myUser/myUserSlice'

export const Nabvar = () => {
    
    const router = useRouter()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const { data: session } = useSession()
    let userName = ''
    let rol = ''
    let uid = ''

    if (session && session.user && session.user.user && session.user.user.name) {
        userName = session.user.user.name
    }

    if (session && session.user && session.user.user && session.user.user.name) {
        rol = session.user.user.rol
    }

    if (session && session.user && session.user.user && session.user.user.uid) {
        uid = session.user.user.uid
    }

    const dispatch = useDispatch()

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        setAnchorEl(null)
        signOut()
    }

    const handleMyUser = async () => {

        setAnchorEl(null)

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${uid}`, requestOptions)
        const user = await res.json()

        const data = user.user

        if(res.status){
            dispatch(startMyUser(data))
            router.push("/usuario")
        }
    }


    const handleAddUser = () => {
        router.push("/registro/usuario")
    }


    const handleGetUsers = () => {
        router.push("/lista/usuario")
    }

    

    const handleOpen = () => {
        setOpenDrawer(true)
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}} variant="dense">

                    <IconButton onClick={ handleOpen } edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography>{userName}</Typography>
                        <Box>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                { rol === 'ADMIN_ROLE' ? <AdminPanelSettingsIcon /> : <AccountCircle /> }  
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{marginTop: '40px'}}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleMyUser}>Mi Usuario</MenuItem>
                                { rol === 'ADMIN_ROLE' && <MenuItem onClick={handleAddUser}>Crear Usuario</MenuItem> }
                                { rol === 'ADMIN_ROLE' && <MenuItem onClick={handleGetUsers}>Lista de Usuario</MenuItem> }
                                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>

                            </Menu>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={ openDrawer }
                onClose={ () => setOpenDrawer(false) }
            >
                <Box 
                    sx={{
                        width: '250px', 
                        height: '100%', 
                        backgroundColor: '#EFF1F1'
                    }}
                >
                    <Box sx={{ padding: '5px 10px' }}>
                        <Typography variant='h4'>ICONO</Typography>
                    </Box>

                    <Divider />
                    
                    <List>
                        <ListItemButton component={Link} to="/bancos">
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary='Bancos' />
                        </ListItemButton>
                    </List>

                    <List>
                        <ListItemButton component={Link} to="/links">
                            <ListItemIcon>
                                <LinkIcon />
                            </ListItemIcon>
                            <ListItemText primary='Links' />
                        </ListItemButton>
                    </List>

                    <List>
                        <ListItemButton component={Link} to="/cuentas">
                            <ListItemIcon>
                                <PaymentsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Cuentas' />
                        </ListItemButton>
                    </List>

                    <List>
                        <ListItemButton component={Link} to="/transacciones">
                            <ListItemIcon>
                                <CurrencyExchangeIcon />
                            </ListItemIcon>
                            <ListItemText primary='Transacciones' />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
