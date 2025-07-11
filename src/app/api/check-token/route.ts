import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export async function GET() {
  const token = (await cookies()).get('userToken')?.value;

  if (!token) {
    return NextResponse.json({ isValid: false }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as {
      userName: string;
      jobTitle: string;
      exp: number;
    };

    return NextResponse.json({
      userName: decoded.userName,
      jobTitle: decoded.jobTitle,
      isValid: true,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
