// import { getLoggedInUserId } from "@/utils/utils";
import { NextResponse } from "next/server";
import { plaidClient } from "@/utils/plaid";

const WEBHOOK_URL =
  process.env.PLAID_SANDBOX_REDIRECT_URI || "https://ed40-198-176-113-208.ngrok-free.app/server/receive_webhook"; 

export async function POST() {
    const tokenResponse = await plaidClient.linkTokenCreate({
        user: { client_user_id: process.env.PLAID_CLIENT_ID },
        products: ['identity'],
        client_name: 'Whered My Money Go?',
        language: 'en',
        country_codes: ['US'],
        webhook: WEBHOOK_URL,
    });
    console.log(tokenResponse.data)
    return NextResponse.json(tokenResponse.data)
}

export const getLoggedInUserId = (request) => {
    const result = request.cookies.get('signedInUser')
    console.log("getLoggedInUserId result", result)
    return result.value
  };