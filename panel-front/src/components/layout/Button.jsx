import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    submit = false,
    height = "100%",
    width = "100%",
    execute = () => {},
    main = false,
    color = null,
    fontSize = "14px",
    bgHover = null,
  } = props;

  return (
    <Container
      type={submit ? "submit" : "button"}
      onClick={!submit ? execute : null}
      height={height}
      width={width}
      $main={main}
      $color={color}
      $fontsize={fontSize}
      $bghover={main && !bgHover ? "var(--main-hover)" : bgHover}
    >
      {text}
    </Container>
  );
};

const Container = styled.button`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.$main ? "var(--bg-public)" : "var(--secondary-color)"};
  background-color: ${(props) =>
    props.$main
      ? props.$color
        ? props.$color
        : "var(--main-color)"
      : "var(--bg-public)"};
  padding: 10px 20px;
  border-radius: 8px;
  font-size: ${(props) => props.$fontsize};
  font-weight: 700;
  cursor: pointer;
  border: none;
  user-select: none;

  &:hover {
    background-color: ${(props) => props.$bghover ?? "var(--main-light)"};
    color: ${(props) =>
      !props.$main ? "var(--main-color)" : "var(--bg-public)"};
  }
`;

export default Button;
