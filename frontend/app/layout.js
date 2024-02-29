import { Inter } from 'next/font/google';
import './globals.css';
import { AuthContextProvider } from '../contexts/authContext';
import { ActiveSidebarProvider } from '../contexts/sidebar';
import Section from '../components/Section';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Student Portal',
  description: 'Developed by Kalyan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-screen overflow-x-hidden">
        <AuthContextProvider>
          <ActiveSidebarProvider>
            <Header />
            {children}
            {/* <Section /> */}
            <Footer />
          </ActiveSidebarProvider>
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
