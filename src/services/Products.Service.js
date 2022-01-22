import { client } from "./api";
import { gql } from "@apollo/client";
import { localStorageConstants } from "../constants";

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
      }
    `,
    // to fix attribute size issue coming wrong
    fetchPolicy: "no-cache",
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
    // to fix attribute size issue coming wrong
    fetchPolicy: "no-cache",
    variables: {
      productId: productId,
    },
  });
}

function saveCartProducts(cart) {
  localStorage.setItem(
    localStorageConstants.CART_PRODUCTS,
    JSON.stringify(cart)
  );
}

export const ProductsService = {
  getProductsByCategory,
  getProductsById,
  saveCartProducts,
};
