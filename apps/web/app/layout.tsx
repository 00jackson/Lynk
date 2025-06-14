import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Navbar } from '@/components/ui/navbar'
import { ThemeProvider } from 'next-themes'


export const metadata = {
  title: 'Lynk',
  description: 'Build fast. Connect faster.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="min-h-[calc(100vh-64px)]"> 
              {children}
            </main>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}