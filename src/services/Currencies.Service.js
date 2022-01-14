import { client } from "./api";
import { gql } from "@apollo/client";

function getCurrencies() {
  return client.query({
    query: gql`
      query GetCurrencies {
        currencies {
          label
          symbol
        }
      }
    `,
  });
}

export const CurrenciesService = {
  getCurrencies,
};
