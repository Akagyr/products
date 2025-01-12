import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import { CartProvider } from './context/cartContext';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ORCHIDS',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ua'>
      <body className={`${montserrat.variable} font-montserrat antialiased relative min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className='flex-1 flex flex-col px-[20px] lg:px-[50px]'>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
