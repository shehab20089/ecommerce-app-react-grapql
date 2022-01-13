import styled, { keyframes } from "styled-components/macro";
const Fade = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
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
export const ProductCardActions = styled.div`
  position: absolute;
  top: -2.75rem;
  right: 0.835rem;
  width: 20%;
  display: none;
  animation: ${Fade} 0.3s linear;
`;
export const ProductCardCartBtn = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--clr-primary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ProductCard = styled.div`
  padding: 0.9rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 35px 0px hsla(210, 5%, 67%, 0.19);
    & ${ProductCardActions} {
      display: block;
    }
  }
`;

export const ProductCardAvatar = styled.img``;
export const ProductCardDescription = styled.div`
  margin-top: 1.3334rem;
  position: relative;
`;
export const ProductCardTitle = styled.h2`
  font-weight: 300;
  font-size: 1rem;
  color: var(--clr-black);
`;
export const ProductCardPrice = styled.p`
  font-weight: 500;
`;
