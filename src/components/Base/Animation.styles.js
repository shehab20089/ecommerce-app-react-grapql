import { keyframes } from "styled-components";

export const Fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
export const dropdownFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Spin = keyframes`

0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }

`;
