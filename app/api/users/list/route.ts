import { NextResponse } from "next/server";
import { getUserList } from "@/utils/db";

export async function GET() {
    const result = await getUserList()
    if (result.name === "error") {
        console.error("Database Error", result)
        return new NextResponse('Internal Server', { status: 500 });
    } else {
        console.log("Got result")
    }
    // const resultJson = JSON.stringify(result)
    return NextResponse.json(result)
}