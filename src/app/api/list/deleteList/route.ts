import { DEV_GATEWAY_URI } from '@/connections';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function DELETE(req: NextRequest) {
    const grocery_list_id = req.nextUrl.searchParams.getAll('grocery_list_id')[0];
    if (!grocery_list_id) {
        return new NextResponse(
            JSON.stringify({ error: 'Grocery list ID is required' }),
            { status: 400 }
        );
    }
    const DELETE_LIST = `/grocery_lists/${grocery_list_id}/delete_list`;
    
    const baseUrl: string = process.env.NEXT_PUBLIC_GATEWAY_URI || DEV_GATEWAY_URI;
    const backendEndpoint: string = baseUrl + DELETE_LIST;

    try {
        const response: AxiosResponse = await axios.delete(
            backendEndpoint,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return new NextResponse(
            JSON.stringify(response.data),
            { status: 200 }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error:", error.response ? error.response.data : error.message);
            return new NextResponse(
                JSON.stringify({ error: 'Error fetching list products' }),
                { status: 500 }
            );
        } else {
            console.error("Unknown error:", error);
            return new NextResponse(
                JSON.stringify({ error: 'An unknown error occurred. Please try again.' }),
                { status: 500 }
            );
        }
    }
}