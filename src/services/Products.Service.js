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
function getProductsById(productId) {
  return client.query({
    query: gql`
      query GetProduct {
       
          product(id:"${productId}") {       
            id
          name
          brand
          inStock
          gallery         
          description
          category
          attributes
          {
            id
            name
            type
            items{
              displayValue
              value
              id
            }
          }  
          prices{
          amount
          currency{
          label
          symbol
          }
          }   
          }
       
      }
    `,
    fetchPolicy: "no-cache",
  });
}

export const ProductsService = {
  getProductsByCategory,
  getProductsById,
};
