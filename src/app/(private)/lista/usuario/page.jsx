import { Box, Typography } from '@mui/material'
import { DataTable } from './components/DataTable'

export const getUsers = async () => {

  const requestOptions = {
    method: "GET",
    cache: "no-store",
    redirect: "follow"
  }

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users?page=0&limit=100`, requestOptions)
    const data = await res.json()

    return data.users

  } catch (error) {

    throw error

  }
}

export default async function UserListPage() {

  const dataUsers = await getUsers()

  return (
    <Box>
      <Typography variant="h4">Listado de Usuarios</Typography>
      
      <DataTable dataUsers={dataUsers} />

    </Box>
  );
}