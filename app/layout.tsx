import {
  ClerkProvider,
} from '@clerk/nextjs';
import './globals.css';
import Header from '@components/component/Header';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>info-hub</title>
        </head>
        <body
          className='w-screen h-screen bg-white'
        >
          <Header />
          <div 
            className='flex flex-row h-[calc(100vh-64px)] overflow-y-hidden relative bg-white'
          >
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}