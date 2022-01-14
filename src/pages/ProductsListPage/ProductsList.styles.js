import styled from "styled-components/macro";

export const ProductPageContainer = styled.main`
  margin: 0 auto;
  max-width: 1238px;
`;

export const CategoryTitle = styled.h1`
  margin-top: 4.45rem;
  margin-bottom: 5.6rem;
  font-weight: 400;

  font-size: 2.33rem;
`;

export const ProductsListContainer = styled.div`
  display: grid;
  gap: 103px 40px;
  grid-template-columns: repeat(3, 386px);
`;
