import styled from "styled-components";
export const CartItemsContainer = styled.div`
  border-top: 1px solid #e5e5e5;
  width: 88.8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;
export const CartItemInfoCol1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const CartItemInfoCol2 = styled.div`
  display: flex;
  gap: 12px;
`;

export const CartItemHeader = styled.div``;
export const CartItemBrand = styled.h2`
  font-weight: 600;
  font-size: 1.7rem;
`;
export const CartItemName = styled.h3`
  font-weight: 400;
  font-size: 1.7rem;
`;

export const CartItemPrice = styled.h3`
  font-weight: 700;
  font-size: 1.35rem;
`;
export const CartItemOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* font-size: 1.35rem; */
`;
export const CartItemQuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 185px;
`;
export const QuantityButton = styled.div`
  border: 1px solid #1d1f22;
  height: ${({ size }) => size.height};
  width: ${({ size }) => size.width};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 100;
  font-size: 2.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const QuantityAmount = styled.div`
  font-weight: 500;

  font-size: 1.35rem;
`;
