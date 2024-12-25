import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../layout/Button";
import Logo from "../logo/Logo";

const Header = ({ isExternal = false }) => {
  const navigate = useNavigate();

  const modules = [
    {
      name: "Dashboard",
      nav: "/dashboard",
    },
    {
      name: "Clientes",
      nav: "/customers",
    },
    {
      name: "Compromissos",
      nav: "/appointments",
    },
  ];

  return (
    <Container $isexternal={isExternal.toString()}>
      <div className="header-size size-width-page">
        <Logo className="logo" />
        <div className="buttons">
          {isExternal ? (
            <Button
              text={"Entrar"}
              execute={() => navigate("/signin")}
              main={true}
            />
          ) : (
            modules.map((m, i) => (
              <Button
                key={i}
                text={m.name}
                execute={() => navigate(m.nav)}
                fontSize={"16px"}
                bgColor={"var(--bg-public)"}
              />
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 15;
  background-color: var(--bg-public);
  box-shadow: ${(props) =>
    props.$isexternal === "true"
      ? "none"
      : "0px -8px 10px 11px rgba(0, 0, 0, 0.156)"};

  .header-size {
    height: 70px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    justify-content: ${(props) =>
      props.$isexternal === "true" ? "space-between" : "flex-start"};
    align-items: center;
    gap: 40px;
  }

  .buttons {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

export default Header;
