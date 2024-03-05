import SessionAuthProvider from '@/context/SessionAuthProvider'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/store/Providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BankInfo",
  description: "Banking information application",
  manifest: "/manifest.json"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionAuthProvider>
          <Providers>
            {children}
          </Providers>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
