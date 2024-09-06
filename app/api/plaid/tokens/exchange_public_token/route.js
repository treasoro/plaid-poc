import { plaidClient } from "@/utils/plaid";

export async function POST(req) {
    try {
        // const userId = getLoggedInUserId(req);
        // const publicToken = escape(req.body.publicToken);
        const res = await req.json();
        console.log(res);
        const tokenResponse = await plaidClient.itemPublicTokenExchange({
          public_token: res.public_token,
        });
        const tokenData = tokenResponse.data;
        console.log("tokenData")
        console.log(tokenData)
        // await db.addItem(tokenData.item_id, userId, tokenData.access_token);
        // await populateBankName(tokenData.item_id, tokenData.access_token);
        // await populateAccountNames(tokenData.access_token);
    
        // Call sync for the first time to activate the sync webhooks
        await syncTransactions(tokenData.item_id);
    
        res.json({ status: "success" });
      } catch (error) {
        console.log(`Running into an error!`);
        console.error("Plaid Error",error)
        return new Response('Server error', {
            status: 500,
        });
      }
}