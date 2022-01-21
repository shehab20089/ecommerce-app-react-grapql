import { client } from "./api";
import { gql } from "@apollo/client";

function getProductsByCategory(category) {
  return client.query({
    query: gql`
      query GetProducts($categoryName: String!) {
        category(input: { title: $categoryName }) {
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
    variables: {
      categoryName: category,
    },
  });
}
function getProductsById(productId) {
  return client.query({
    query: gql`
      query GetProduct($productId: String!) {
        product(id: $productId) {
          id
          name
          brand
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            amount
            currency {
              label
              symbol
            }
          }
        }
      }
    `,
    fetchPolicy: "no-cache",
    variables: {
      productId: productId,
    },
  });
}

export const ProductsService = {
  getProductsByCategory,
  getProductsById,
};
