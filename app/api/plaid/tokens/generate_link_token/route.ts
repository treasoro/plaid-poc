// import { getLoggedInUserId } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/utils/plaid";

const WEBHOOK_URL =
  process.env.WEBHOOK_URL || "https://www.example.com/server/receive_webhook";

export async function POST(request: NextRequest, response: NextResponse ) {
    const userId = getLoggedInUserId(request);
    console.log("userId", userId)
    const userObject = { client_user_id: userId }
    const tokenResponse = await plaidClient.linkTokenCreate({
        user: userObject,
        products: ["identity"],
        client_name: "Where'd My Money Go?",
        language: "en",
        country_codes: ["US"],
        webhook: WEBHOOK_URL,
    });
    return NextResponse.json(tokenResponse.data)
}

export const getLoggedInUserId = (request: NextRequest) => {
    const result = request.cookies.get('signedInUser')
    console.log("getLoggedInUserId result", result)
    return result!.value
  };