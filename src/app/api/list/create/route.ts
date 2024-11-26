import axios, { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

const SAVE_LIST = "/grocery_lists/create";

export async function POST(req: NextRequest) {
  console.log("ENTRE EN SAVE LIST CREATE");
  const { user_id, name, products } = await req.json();
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://gateway:8000";
  const backendEndpoint = baseUrl + SAVE_LIST;

  try {
    const response: AxiosResponse = await axios.post(
      backendEndpoint,
      { user_id, name, products },
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
