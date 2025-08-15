import { GATEWAY_URI } from '@/connections';
import axios, { AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const recipe_id = req.nextUrl.searchParams.getAll('recipe_id')[0];

    const GET_RECIPE_BY_ID = `/recipe`;

    const baseUrl: string = process.env.NEXT_PUBLIC_GATEWAY_URI || GATEWAY_URI;
    const backendEndpoint: string = baseUrl + GET_RECIPE_BY_ID;

    try {
        const response: AxiosResponse = await axios.get(backendEndpoint, {
            params: { recipe_id },
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