import Image from 'next/image'
import Link from 'next/link'
import nlwLogo from '../assets/nlw-logo.svg'

export const HeroPainel = () => {
  return (
    <div className="flex flex-col items-center gap-5 lg:items-start">
      <Image src={nlwLogo} alt="NLW Spacetime" />
      <div className="max-w-[420px] space-y-1">
        <h1 className="text-center text-2xl font-bold leading-tight text-gray-50 lg:text-left lg:text-5xl">
          Sua cápsula do tempo
        </h1>
        <p className="text-center leading-relaxed lg:text-left lg:text-lg">
          Colecione momentos marcantes durante sua jornada e compartilhe (se
          quiser) com o mundo
        </p>
      </div>
      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  )
}
