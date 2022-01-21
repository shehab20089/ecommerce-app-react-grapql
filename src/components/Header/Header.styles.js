import styled, { keyframes } from "styled-components/macro";
import logo from "../../assets/images/a-logo.png";

const dropdownFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledHeader = styled.header`
  display: flex;
  padding: 0 7rem;
  height: 80px;
  padding-top: 1.2rem;
  justify-content: space-between;
`;

export const MenuList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;
  justify-content: space-between;
`;

export const MenuListItem = styled.li`
  color: var(${({ active }) => (active ? "--clr-primary" : "--clr-black")});
  border-bottom: ${({ active }) =>
    active ? "2px solid var(--clr-primary)" : "none"};
  text-align: center;
  padding: 0 0.9rem;
  align-self: stretch;
  &:hover {
    cursor: pointer;
  }
  & a {
    color: var(${({ active }) => (active ? "--clr-primary" : "--clr-black")});
    &:hover {
      color: var(--clr-primary);
      opacity: ${({ active }) => (!active ? 0.7 : 1)};
    }
  }
`;

export const MenuListItemLink = styled.a`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const LogoContainer = styled.div`
  width: 41px;
  height: 41px;
  align-self: center;
  background-image: url(${logo});
`;

export const ActionsContainer = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CurrencyDropDownContainer = styled.div`
  display: none;
  position: absolute;
  top: 1.8rem;
  z-index: 4;
  background-color: white;
  left: -20px;
  animation: ${dropdownFade} 0.3s linear;
  box-shadow: 0px 4px 35px 0px hsla(210, 5%, 67%, 0.19);
  min-width: 114px;
  max-height: 200px;
  overflow: auto;
  scroll-behavior: smooth;

  padding-top: 1.12rem;
`;
export const CurrencyDropDownItem = styled.div`
  padding: 0 1.12rem 1.1rem;
`;
export const Icon = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ size }) => size.width};
  height: ${({ size }) => size.height};
  margin-left: 0.55rem;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center;
`;
export const IconBadge = styled.div`
  position: absolute;
  top: -11px;
  right: -11px;
  width: 20px;
  height: 20px;
  background: var(--clr-black);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
`;
export const CurrencyContainer = styled.div`
  position: relative;
  cursor: pointer;
  &:hover ${CurrencyDropDownContainer} {
    display: block;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -20px;
    z-index: 3;
    opacity: 0;
    background-color: red;
    width: 200%;
    height: 100px;
  }
`;
export const OverLayContainer = styled.div`
  position: relative;
  &:hover ${Icon} {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const CartDropDownContainer = styled.div`
  display: ${({ showOverlay }) => (showOverlay ? "block" : "none")};
  position: absolute;
  top: 43px;
  z-index: 2;
  right: -10px;
  animation: ${dropdownFade} 0.3s linear;
  box-shadow: 0px 4px 35px 0px hsla(210, 5%, 67%, 0.19);
  width: 400px;
  max-height: 80vh;
  overflow: auto;
  scroll-behavior: smooth;
  background: white;
  padding: 0.9rem;
`;
export const PageOverlay = styled.div`
  display: ${({ showOverlay }) => (showOverlay ? "block" : "none")};

  position: absolute;
  left: 0;
  top: 80px;
  height: 100vh;
  width: 100%;
  z-index: 1;
  background: rgba(57, 55, 72, 0.22);
`;
export const CartDropDownTitle = styled.p`
  font-weight: 700;
  font-size: 0.9rem;
`;
export const CartDropDownTitleSpan = styled.span`
  font-weight: 500;
`;

export const CartProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 2.3rem 0;
`;
export const TotalPriceLabel = styled.div``;
export const TotalPriceAmount = styled.div``;
export const CartDropdownActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  & a {
    width: 100%;
  }
`;
