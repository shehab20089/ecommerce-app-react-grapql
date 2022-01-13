import styled from "styled-components";

export const Icon = styled.div`
  display: inline-block;
  width: ${({ size }) => size.width};
  height: ${({ size }) => size.height};
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center;
`;
