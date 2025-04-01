import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import { CartProvider } from './context/cartContext';
import { Montserrat } from 'next/font/google';
import { BreadcrumbsProvider } from './context/breadcrumbsContext';
import Footer from './components/Footer';

const montserrat = Montserrat({
  subsets: ['cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OrchiQueen',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ua'>
      <body
        className={`${montserrat.variable} font-montserrat antialiased flex flex-col min-h-screen`}
      >
        <BreadcrumbsProvider>
          <CartProvider>
            <Header />
            <main className='flex-grow'>
              {children}
            </main>
            <Footer />
          </CartProvider>
        </BreadcrumbsProvider>
      </body>
    </html>
  );
}
