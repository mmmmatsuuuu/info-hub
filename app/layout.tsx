import './globals.css';
import Header from '@components/component/common/Header';
import { ThemeProvider } from "next-themes";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <title>info-hub - 動画で「情報」の授業を学ぼう！</title>
        <meta name="description" content="「情報Ⅰ」や「情報Ⅱ」に関する内容を動画や小テスト、対応する教材で学ぶことができるサイトです。" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div 
            className='flex flex-row h-[calc(100vh-64px)] overflow-y-hidden relative bg-background'
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}