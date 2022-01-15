import styled from "styled-components";

export const BaseButton = styled.button`
  cursor: pointer;
  height: ${({ size }) => size.height};
  border: none;
  background: none;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : "var(--clr-primary)"};
  font-weight: 600;
  font-size: ${({ size }) => size.font};
  color: ${({ color }) => (color ? color : "white")};
  text-transform: uppercase;
  &:hover {
    opacity: 0.8;
  }
`;
