import styled from "styled-components";
export const CartItemsContainer = styled.div`
  border-top: ${({ size }) => (size != "mini" ? " 1px solid #e5e5e5" : "none")};

  width: ${({ size }) => (size != "mini" ? "88.8%" : "100%")};
  display: flex;
  justify-content: space-between;

  overflow: hidden;
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
  align-items: center;
  gap: 12px;
`;

export const CartItemHeader = styled.div``;
export const CartItemBrand = styled.h2`
  font-weight: ${({ size }) => (size != "mini" ? "600" : "300")};
  font-size: ${({ size }) => (size != "mini" ? "1.7rem" : "0.9rem")};
`;
export const CartItemName = styled.h3`
  font-weight: ${({ size }) => (size != "mini" ? "400 " : "300")};
  font-size: ${({ size }) => (size != "mini" ? "1.7rem" : "0.9rem")}; ;
`;

export const CartItemPrice = styled.h3`
  font-weight: ${({ size }) => (size != "mini" ? "700 " : "500")};
  font-size: ${({ size }) => (size != "mini" ? "1.35rem" : "0.9rem")};
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
  height: ${({ size }) => (size != "mini" ? "185px" : "137px")};
`;
export const QuantityButton = styled.div`
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

export const QuantityAmount = styled.div`
  font-weight: ${({ size }) => (size != "mini" ? "500" : "300")};
  font-size: ${({ size }) => (size != "mini" ? "1.35rem" : "0.9rem")};
`;
