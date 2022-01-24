import styled from "styled-components";
import { Fade } from "../Base/Animation.styles";

export const ProductCardActions = styled.div`
  position: absolute;
  top: -2.75rem;
  right: 0.835rem;
  width: 100%;
  display: none;
  animation: ${Fade} 0.3s linear;
`;
export const AttributesOverlay = styled.div`
  position: absolute;
  z-index: 0;
  top: -50px;
  right: 50px;
  display: none;
  flex-direction: column;
  gap: 20px;
  background: white;
  margin: 0 auto;
  width: 70%;
  animation: ${Fade} 0.3s linear;
  padding: 0.9rem;
  box-shadow: 0px 4px 35px 0px hsla(210, 5%, 67%, 0.19);
`;
export const ProductCardCartBtn = styled.div`
  margin-left: auto;
  display: ${({ isInStock }) => (isInStock ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background: var(--clr-primary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  &:hover ${AttributesOverlay} {
    display: flex;
    z-index: 3;
  }
`;

export const ProductCardContainer = styled.div`
  position: relative;
  opacity: ${({ isInStock }) => (isInStock ? 1 : 0.5)};
  padding: 0.9rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 35px 0px hsla(210, 5%, 67%, 0.19);
    & ${ProductCardActions} {
      display: block;
    }
  }
`;

export const ProductCardAvatar = styled.div`
  position: relative;
  height: 354px;
  background: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  &::before {
    content: ${({ isInStock }) => (isInStock ? "none" : "'out of stock'")};
    position: absolute;
    text-transform: uppercase;
    font-size: 1.34rem;
    color: #8d8f9a;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* background: red; */
  }
`;
export const ProductCardDescription = styled.div`
  margin-top: 1.3334rem;
  position: relative;
  color: var(--clr-black);
`;
export const ProductCardTitle = styled.h2`
  font-weight: 300;
  font-size: 1rem;
`;
export const ProductCardPrice = styled.p`
  font-weight: 500;
`;

export const OverlayTitle = styled.div`
  font-size: 1rem;
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
