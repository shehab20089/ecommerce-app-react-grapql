import styled from "styled-components";

export const ImageSliderContainer = styled.div`
  position: relative;
  width: 141px;
  height: 185px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const ImageSliderActionsContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  & div {
    cursor: pointer;
  }
`;
