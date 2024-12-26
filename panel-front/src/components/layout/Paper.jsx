import styled from "styled-components";

const Paper = (props) => {
  const {
    children,
    height = "100%",
    width = "100%",
    flexDirectionRow = false,
    flexCenter = false,
    padding = "15px",
    boxShadow = false,
    gap = "25px",
    hover = false,
    onClick = () => {},
  } = props;
  return (
    <Container
      height={height}
      width={width}
      $gap={gap}
      $flexcenter={flexCenter.toString()}
      $flexdirectionrow={flexDirectionRow.toString()}
      $padding={padding}
      $boxshadow={boxShadow.toString()}
      $hover={hover.toString()}
      onClick={props.onClick}
    >
      {children}
    </Container>
  );
};

const Container = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  flex-direction: ${(props) =>
    props.$flexdirectionrow === "true" ? "row" : "column"};
  justify-content: ${(props) =>
    props.$flexcenter === "true" ? "center" : "flex-start"};
  align-items: ${(props) =>
    props.$flexcenter === "true" ? "center" : "flex-start"};
  gap: ${(props) => props.$gap};
  background-color: var(--bg-public);
  padding: ${(props) => props.$padding};
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.$boxshadow === "true"
      ? "none"
      : "0px 2px 10px 1px rgba(0, 0, 0, 0.23)"};
  cursor: ${(props) => (props.$hover === "true" ? "pointer" : "default")};

  &:hover {
    box-shadow: ${(props) =>
      props.$hover === "true" && "0px 0px 4px 1px var(--main-color)"};
  }

  .top {
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    flex-grow: 0;
    user-select: none;
    margin-bottom: 20px;

    .buttons {
      width: fit-content;
      height: 100%;
      display: flex;
      gap: 10px;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    flex-grow: 0;
  }
`;

export default Paper;
