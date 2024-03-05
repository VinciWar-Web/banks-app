import { Box, Typography } from "@mui/material"
import { DataTable } from "./components/DataTable"

const getBancks = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic Y2E3OGVhZjEtNDg0My00NjAwLTg3MTMtOTRkMGRjMmE3NDU5OnNwbmpud21qZHJMSnZvM1Jia3owUWtCSGtAcWxWTm9jSXYzOG9aVWF1ZDBpRGhAeUBWeXNXa0NjWEA3czVwZUw=")

  const requestOptions = {
    method: "GET",
    cache: "no-store",
    headers: myHeaders,
    redirect: "follow"
  }

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_SANDBOX}/institutions/`, requestOptions);
    const data = await response.json()

    return data.results

  } catch (error) {

    throw error

  }
}

export default async function BancosPage() {

  const dataBancks = await getBancks()

  return (
    <Box>
      <Typography variant="h4">Listado de Bancos</Typography>
      
      <DataTable dataBancks={dataBancks} />

    </Box>
  );
}