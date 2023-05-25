import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`,
    },
  })
}
