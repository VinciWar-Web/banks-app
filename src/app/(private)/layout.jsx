import { Box } from '@mui/material'
import { Nabvar } from '../components/Nabvar'

export default function NavbarLayout({ children }) {
    return (
      <>
        <Nabvar />
        <Box 
          sx={{
            padding: {
              sm: '40px',
              xs: '10px',
            }
          }}
        >
          { children }
        </Box>
      </>
    )
   }