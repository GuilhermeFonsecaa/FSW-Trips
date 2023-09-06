import { NextAuthProvider } from "@/Providers/auth";
import "./globals.css"
import { Poppins } from 'next/font/google';
import Header from '../Components/Header';
import Footer from './trips/[tripId]/Components/Footer'
import ToastProvider from "@/Providers/toast";

const poppins = Poppins({
  subsets: ["latin"], weight: [
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ]
});

export const metadata = {
  title: "FSW Trips",
  description: "Sistema de Reserva de Viagens"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
