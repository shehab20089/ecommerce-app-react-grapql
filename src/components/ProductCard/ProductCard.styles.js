import styled from "styled-components";
import { Fade } from "../Base/Animation.styles";

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

export const ProductCardContainer = styled.div`
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
  height: 354px;
  background: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
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
