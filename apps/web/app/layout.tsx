import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Navbar } from '@/components/ui/navbar'

export const metadata = {
  title: 'Lynk',
  description: 'Build fast. Connect faster.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}