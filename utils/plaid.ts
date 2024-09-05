import { callMyServer } from "./utils"
import { Configuration, PlaidEnvironments, PlaidApi } from 'plaid'

export async function startLink(customSuccessHandler) {
    const linkTokenData = await fetchLinkToken();
    console.log("linkTokenData", linkTokenData)
    customSuccessHandler()
}

async function fetchLinkToken() {
    const linkTokenData = await callMyServer(
        "api/plaid/tokens/generate_link_token",
        true
    );
    return linkTokenData
}

const PLAID_ENV = (process.env.PLAID_ENV || "sandbox").toLowerCase();


// Set up the Plaid client library
const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

export const plaidClient = new PlaidApi(plaidConfig);