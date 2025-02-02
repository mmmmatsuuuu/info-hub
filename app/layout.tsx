import {
  ClerkProvider,
} from '@clerk/nextjs';
import './globals.css';
import Header from '@components/component/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body
          className='w-screen h-screen bg-white'
        >
          <Header />
          <div 
            className='max-w-6xl mx-auto flex flex-row h-[calc(100vh-64px)] overflow-y-hidden relative bg-white'
          >
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}