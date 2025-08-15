import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { NEXT_PUBLIC_GATEWAY_URI } from '@/connections';

const LOGIN = "/login";
const COOKIE_NAME = 'Ahorraton';
const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();
    const baseUrl: string = NEXT_PUBLIC_GATEWAY_URI;
    const backendEndpoint: string = baseUrl + LOGIN;

    console.log("Received login request with username:", username);

    try {
        const response: AxiosResponse = await axios.post(
            backendEndpoint,
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const { token, user } = response.data;

        const serialized = serialize(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: MAX_AGE,
            path: "/",
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                user,
            }),
            {
                status: 200,
                headers: { "Set-Cookie": serialized },
            }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error:", error.response ? error.response.data : error.message);
            return NextResponse.json({ error: 'There was an error processing your request. Please try again.' }, { status: 500 });
        } else {
            console.error("Unknown error:", error);
            return NextResponse.json({ error: 'An unknown error occurred. Please try again.' }, { status: 500 });
        }
    }
}
