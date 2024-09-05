import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    
    try {
    request.cookies.delete("signedInUser")
    }
    catch (error) {
        console.error("Error", error)
        return new NextResponse('Internal Server', { status: 500 });
    }

    
    return NextResponse.json({ "signedOut": true})
}