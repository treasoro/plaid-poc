import { callMyServer } from "./utils"
import { Configuration, PlaidEnvironments, PlaidApi } from 'plaid'


export async function startLink(customSuccessHandler) {
    const linkTokenData = await fetchLinkToken();
    if (linkTokenData === undefined) {
        return;
    }
    console.log("linkTokenData", linkTokenData)

    return linkTokenData
}

async function fetchLinkToken() {
    const linkTokenData = await callMyServer(
        "api/plaid/tokens/generate_link_token",
        true
    );
    return linkTokenData.link_token
}


// Set up the Plaid client library
// const plaidConfig = new Configuration({
//   basePath: PlaidEnvironments[process.env.PLAID_ENV],
//   baseOptions: {
//     headers: {
//       "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
//       "PLAID-SECRET": process.env.PLAID_SECRET,
//       "Plaid-Version": "2020-09-14",
//     },
//   },
// });

// export const plaidClient = new PlaidApi(plaidConfig);

export const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
        'Plaid-Version': '2020-09-14',
      },
    },
  }),
);
plaidClient.create;