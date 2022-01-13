import { client } from "./api";
import { gql } from "@apollo/client";

function getCategories() {
  return client.query({
    query: gql`
      query getCategories {
        categories {
          name
        }
      }
    `,
  });
}

export const CategoriesService = {
  getCategories,
};
