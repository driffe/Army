import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Navigation'
import FinanceContextProvider from '@/lib/store/finance-context'
import AuthContextProvider from '@/lib/store/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <Nav/> 
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
