import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/utils/db";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const username = escape(data.username)
    const result = await addUser(username)
    if (result.name === "error") {
        console.error("Database Error", result)
        return new NextResponse('Internal Server', { status: 500 });
    } else {
        console.log("Got result")
    }
    // const resultJson = JSON.stringify(result)
    return NextResponse.json(result)
}