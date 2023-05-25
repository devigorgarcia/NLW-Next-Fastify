import { api } from '@/services/api'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', { code })

  const { token } = registerResponse.data

  const redirectURL = redirectTo ?? new URL('/', request.url) // ternario --- se redirectTo existir então vai pro redirectTO se não new URL

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // segundos * minutos * dia * qtos dias

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
