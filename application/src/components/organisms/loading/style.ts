import { keyframes, styled } from "styled-components";

const loadingIndicator = keyframes`
    0% {
      animation-timing-function: cubic-bezier(1, 0, 0.7, 1);
      opacity: 0.5;
      transform: scale(1);
    }
    40% {
      animation-timing-function: cubic-bezier(0.3, 0, 0, 1);
      opacity: 0.75;
      transform: scale(1.3);
    }
    72.5% {
      animation-timing-function: linear;
      opacity: 0.5;
      transform: scale(1);
    }
    100% {
      opacity: 0.5;
      transform: scale(1);
    }
`;

export const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  & * {
    box-sizing: border-box;
  }

  & .loading-indicator {
    content: "";
    width: 56px;
    inline-size: 56px;
    block-size: 12.4px;
    height: 12.4px;
    overflow-clip-margin: content-box;
    overflow: hidden;
  }
  & .loading-indicator circle {
    fill: #121212;
    animation: ${loadingIndicator} 1.32s linear infinite;
    transform-origin: center center;
    opacity: 0.5;
  }
  & .loading-indicator circle:nth-of-type(2) {
    animation-delay: 0.1s;
  }
  & .loading-indicator circle:nth-of-type(3) {
    animation-delay: 0.2s;
  }
`;
