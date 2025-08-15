import { GATEWAY_URI } from '@/connections';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const REGISTER = "/register" // Move this to a constants/endpoints file

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();
    const baseUrl: string = GATEWAY_URI;
    const backendEndpoint: string = baseUrl + REGISTER
    console.log("Received registration. Posting to:", backendEndpoint);

    try {
        const response: AxiosResponse = await axios.post(
            backendEndpoint,
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        return NextResponse.json(response.data, { status: 200 });
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
