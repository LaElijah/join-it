import { NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'



export const config = {
    matcher: [
        "/resources/create`",
        "/requests/create",
    ],
  


}


