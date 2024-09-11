import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const GET_USER_LISTS = "/grocery_lists/get_lists";

export async function GET(req: NextRequest) {
    const user_id = req.nextUrl.searchParams.getAll('user_id')[0];
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://gateway:8000";
    const backendEndpoint = baseUrl + GET_USER_LISTS;

    try {
        const response: AxiosResponse = await axios.get(backendEndpoint, {
            params: { user_id },
            headers: { 'Content-Type': 'application/json' }
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: response.data,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error fetching user lists:", error);
        return NextResponse.json({ error: 'There was an error processing your request. Please try again.' }, { status: 500 });
    }
}
