import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const userId = Number(escape(data.userId))


    const res = new NextResponse
    try {
        res.cookies.set("signedInUser", String(userId), {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        })
    }
    catch (error) {
        console.error("Error", error)
        return new NextResponse('Internal Server', { status: 500 });
    }
    return res
}