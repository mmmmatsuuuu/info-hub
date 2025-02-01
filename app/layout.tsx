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
          className='w-screen min-h-screen bg-white'
        >
          <Header />
          <div className='max-w-5xl mx-auto py-12 px-4'>
          {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}