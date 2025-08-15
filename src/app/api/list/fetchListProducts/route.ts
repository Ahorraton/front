import { DEV_GATEWAY_URI } from "@/utils/connections";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

const ADD_PRODUCTS = "/grocery_lists/add_prods_to_my_list";

export async function POST(req: NextRequest) {
  const { products_eans } = await req.json();
  const baseUrl: string = process.env.NEXT_PUBLIC_GATEWAY_URI || DEV_GATEWAY_URI;
  const backendEndpoint: string = baseUrl + ADD_PRODUCTS;

  try {
    const response: AxiosResponse = await axios.post(
      backendEndpoint,
      { product_codes: products_eans },
      { headers: { "Content-Type": "application/json" } }
    );

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
    if (axios.isAxiosError(error)) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      return NextResponse.json(
        {
          error:
            "There was an error processing your request. Please try again.",
        },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred. Please try again." },
        { status: 500 }
      );
    }
  }
}
