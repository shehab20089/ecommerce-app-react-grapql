import { client } from "./api";
import { gql } from "@apollo/client";

function getProductsByCategory(category) {
  return client.query({
    query: gql`
      query GetProducts {
        category(input:{title:"${category}"}) {
          name
          products {
            id
            name
            brand
            inStock
            gallery
            prices {
              amount
              currency {
                    label
                    symbol
                       }
                   }
          }
        }
      }
    `,
  });
}

export const ProductsService = {
  getProductsByCategory,
};
