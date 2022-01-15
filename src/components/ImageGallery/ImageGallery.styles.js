import styled from "styled-components";

export const GalleryContainer = styled.div`
  display: flex;
  gap: 40px;
`;
export const GalleryImageItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
export const GalleryImage = styled.div`
  width: 80px;
  height: 80px;
  cursor: pointer;
  background: url(${({ image }) => image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  &:hover {
    opacity: 0.8;
  }
`;
export const GallerySelectedImage = styled.div`
  width: 100%;

  background-image: url(${({ image }) => image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-height: 511px;
`;
