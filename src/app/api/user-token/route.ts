// POST /api/user-token

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  const body = await request.json();

  const { userName, jobTitle } = body;

  if (!userName || !jobTitle) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const token = jwt.sign({ userName, jobTitle }, SECRET, { expiresIn: '10m' });

  const response = NextResponse.json({ success: true });

  // Accepts userName and jobTitle and returns a JWT in an HTTP-only cookie
  response.cookies.set('userToken', token, {
    httpOnly: true,
    maxAge: 600, //10 minutes
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
