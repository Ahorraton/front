import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import axios from 'axios'

export const dynamic = 'force-dynamic';

const COOKIE_NAME = 'Ahorraton';
const LOGOUT = '/logout'

export async function GET() {
    const serialized = serialize(COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
    });

    try {
        console.log("Logging out from backend...");
        // await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://gateway:8000"}${LOGOUT}`);
    } catch (error) {
        console.error("Error logging out from backend:", error);
    }

    return new NextResponse(
        JSON.stringify({ status: "success" }),
        {
            status: 200,
            headers: { "Set-Cookie": serialized },
        }
    );
}
