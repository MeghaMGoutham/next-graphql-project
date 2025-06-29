import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set('userToken', '', {
    maxAge: 0, // Clear the cookie immediately
    path: '/',
  });

  return response;
}
