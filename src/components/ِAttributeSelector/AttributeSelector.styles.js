import styled from "styled-components";

export const AttributeContainer = styled.div``;
export const AttributeTitle = styled.p`
  font-weight: ${({ size }) => (size != "mini" ? "700" : "300")};
  font-size: ${({ size }) => (size != "mini" ? "1rem" : "0.9rem")};
  text-transform: uppercase;
`;
export const AttributeSelection = styled.div`
  display: flex;

  gap: ${({ size }) => (size != "mini" ? "12px" : "5px")};
`;
export const AttributeSelectionItem = styled.div`
  border: 1px solid #1d1f22;

  min-width: ${({ size }) => (size != "mini" ? "63px" : "25px")};
  min-height: ${({ size }) => (size != "mini" ? "45px" : "25px")};
  font-size: ${({ size }) => (size != "mini" ? "0.9rem" : "0.5rem")};
  /* padding: ${({ size }) => (size != "mini" ? "0" : "0.3rem")}; */

  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
  align-items: center;
  background-color: ${({ selected }) =>
    !selected ? "inherit" : "hsla(216, 8%, 12%, 1)"};

  color: ${({ selected }) =>
    !selected ? "hsla(0, 0%, 16%, 1)" : "hsla(0, 0%, 100%, 1)"};
  cursor: pointer;
  &:hover {
    opacity: ${({ selected }) => (!selected ? "0.4" : "1")};
  }
`;
export const AttributeSelectionItemSwatch = styled.div`
  border: 1px solid #1d1f22;
  width: ${({ size }) => size.width};
  height: ${({ size }) => size.height};
  background-color: ${({ color }) => color};
  opacity: ${({ selected }) => (selected ? 1 : 0.2)};
  color: ${({ selected }) =>
    !selected ? "hsla(0, 0%, 16%, 1)" : "hsla(0, 0%, 100%, 1)"};
  cursor: pointer;
  &:hover {
    opacity: ${({ selected }) => (!selected ? "0.4" : "1")};
  }
`;
