import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const REGISTER = "/register" // Move this to a constants/endpoints file

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // The env var should be called NEXT_PUBLIC_BACKEND_ENDPOINT
    const backendEndpoint = baseUrl + REGISTER
    console.log("Received registration request with email:", email);

    try {
        const response: AxiosResponse = await axios.post(
            backendEndpoint,
            { email, password },
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
