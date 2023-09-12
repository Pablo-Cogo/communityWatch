import { LoadingContainer } from "./style";

const Loading = () => {
  return (
    <LoadingContainer>
      <svg
        className="loading-indicator"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1 100"
        role="progressbar"
        aria-valuetext="Loading"
      >
        <circle stroke="none" cx="-140" cy="50" r="32"></circle>
        <circle stroke="none" cx="0" cy="50" r="32"></circle>
        <circle stroke="none" cx="140" cy="50" r="32"></circle>
      </svg>
    </LoadingContainer>
  );
};

export default Loading;
