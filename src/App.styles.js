import styled from "styled-components";
import { Spin } from "./components/Base";

export const AppWrapper = styled.div`
  position: ${({ isLoading }) => (isLoading ? "fixed" : "static")};
  width: ${({ isLoading }) => (isLoading ? "100%" : "auto")};
`;
export const ActivityOverLay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background: rgba(57, 55, 72, 0.22);
`;
export const ActivityIndicator = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid var(--clr-primary);
  border-radius: 50%;
  width: 80px;
  height: 80px;

  animation: ${Spin} 2s linear infinite;
`;
