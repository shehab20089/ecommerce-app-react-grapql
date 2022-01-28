import styled, { css } from "styled-components";
import { AppearFromRight, hideToRight, Spin } from "./components/Base";

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
export const NotificationsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 111;
  overflow: hidden;
`;

export const NotificationItem = styled.div`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;

  width: 300px;
  z-index: 111;
  background-color: var(--clr-primary);
  opacity: 0.7;
  border-radius: 4px;
  color: white;
  padding: 1rem;
  margin: 0.5rem;
  ${({ deleted }) =>
    deleted
      ? css`
          animation: ${hideToRight} 0.4s ease-in forwards;
        `
      : css`
          animation: ${AppearFromRight} 0.8s ease-out forwards;
        `}

  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
