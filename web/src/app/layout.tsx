import { Copyright } from '@/components/Copryright'
import { HeroPainel } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import {
  Bai_Jamjuree as BaiJamjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-baiJamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma capsula do tempo criada com react, next, tailwind',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-sans ${baiJamjuree.variable} bg-gray-900 text-gray-100`}
      >
        <main className="grid lg:min-h-screen lg:grid-cols-2">
          {/* left */}
          <div className="j relative flex min-h-screen flex-col items-center justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16 lg:items-start">
            {/* blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2  translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            {/* stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2  bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <HeroPainel />
            <Copyright />
          </div>

          {/* right */}
          {children}
        </main>
      </body>
    </html>
  )
}
