import styled from "styled-components";

export const BaseButton = styled.button`
  cursor: pointer;
  height: ${({ size }) => size.height};
  width: 100%;
  border: none;
  background: none;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : "var(--clr-primary)"};
  border: ${({ border }) => (border ? border : "none")};
  font-weight: 600;
  font-size: ${({ size }) => size.font};
  color: ${({ color }) => (color ? color : "white")};
  font-family: inherit;
  text-transform: uppercase;
  &:hover {
    opacity: 0.8;
  }
`;
