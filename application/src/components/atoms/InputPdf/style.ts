import styled from "styled-components";

export const FileContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;

  .react-pdf__Page__textContent,
  .react-pdf__Page__annotations {
    display: none;
  }
`;

export const FileInputContainer = styled.label`
  position: relative;
  text-align: center;
  border: 2px dashed grey;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 0.8em;
  transition: border 300ms ease;
  cursor: pointer;
  text-align: center;
  overflow: hidden;

  &:hover,
  &.drag-over {
    border: 2px solid black;
  }
`;

export const StyledFileInput = styled.input`
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  cursor: pointer;
`;

export const FileInputLabel = styled.p`
  color: grey;
  transition: 200ms color;

  &:hover {
    color: black;
  }
`;

export const StyledFileIcon = styled(FileInputLabel).attrs({ as: "i" })`
  display: block;
  font-size: 42px;
  padding-bottom: 16px;
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  height: fit-content;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;

  canvas {
    width: 100% !important;
  }
`;

export const ButtonsThumbnail = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;

  @media (max-width: 200px) {
    flex-direction: column;
  }
`;

export const ButtonThumbnail = styled.button`
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  color: grey;
  cursor: pointer;

  &:hover {
    color: black;
  }

  svg {
    font-size: 18px;
  }
`;
