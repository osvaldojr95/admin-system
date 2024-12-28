import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logo = ({ big = false, white = false }) => {
  const navigate = useNavigate();
  return (
    <Container
      size={big ? "45px" : "22px"}
      $white={white}
      onClick={() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard");
        else navigate("/");
      }}
    >
      <img src="/logo.png" alt="logo" size={big ? "40px" : "20px"} />
      AdminSystem
    </Container>
  );
};

const Container = styled.h1`
  font-size: ${(props) => props.size};
  font-weight: 700;
  color: ${(props) => (props.$white ? "var(--bg-public)" : "var(--main-color)")};
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;

  img {
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    margin-right: 10px;
    color: var(--main-color);
  }
`;

export default Logo;
