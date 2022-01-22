import styled from "styled-components";

export const ProductPageContainer = styled.main`
  margin: 80px auto 0;
  max-width: 1281px;
  display: grid;
  grid-template-columns: 57% 23%;
  min-height: 500px;
  gap: 100px;
`;

export const ProductPageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
export const ProductPageInfoTitle = styled.div`
  font-size: 1.671rem;
`;
export const ProductPageInfoBrand = styled.h1`
  font-weight: 600;
  font-size: inherit;
`;

export const ProductPageInfoName = styled.h2`
  font-weight: 400;
  font-size: inherit;
`;

export const ProductPagePriceContainer = styled.div``;

export const ProductPagePriceTitle = styled.p`
  font-weight: 700;
  text-transform: uppercase;
`;
export const ProductPagePriceValue = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.335rem;
  line-height: 2;
`;
export const QuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

export const QuantityBtn = styled.div`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  border: 1px solid #1d1f22;
  height: ${({ size }) => size.height};
  width: ${({ size }) => size.width};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 100;
  font-size: ${({ size }) => size.fontSize};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const ProductPageDescription = styled.div``;
export const ProductPageErrorTitle = styled.div`
  color: #fc2222;
  font-size: 1.3rem;
`;
