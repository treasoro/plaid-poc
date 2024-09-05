import { NextRequest, NextResponse } from "next/server";
import { getUserRecord } from "@/utils/db";

export async function GET(request: NextRequest) {

    const data = await request.json();
    const userId = Number(escape(data.userId))
    const result = await getUserRecord(userId)
    if (result.name === "error") {
        console.error("Database Error", result)
        return new NextResponse('Internal Server', { status: 500 });
    } else {
        console.log("Got result")
    }
    // const resultJson = JSON.stringify(result)
    return NextResponse.json(result)
}