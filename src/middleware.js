export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    "/bancos/:path*", 
    "/links/:path*", 
    "/cuentas/:path*", 
    "/transacciones/:path*",
    "/usuario/:path*",
    "/registro/usuario/:path*",
    "/lista/usuario/:path*"
],
};