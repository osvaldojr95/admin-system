import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";

const PageLayout = (props) => {
  const {
    children,
    bgColor = "var(--bg-public)",
    noHeader = false,
    isExternal = false,
    alignStart = false,
    full = false,
  } = props;
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, []);

  return (
    <Container
      $bgcolor={bgColor}
      $alignstart={alignStart.toString()}
      $full={full.toString()}
    >
      {!noHeader && <Header isExternal={isExternal} />}
      <div className="main-content size-width-page">{children}</div>
    </Container>
  );
};

const Container = styled.div`
  height: ${(props) => (props.$full === "true" ? "100vh" : "100%")};
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.$bgcolor};
  padding-top: 90px;

  .main-content {
    height: calc(100% - 30px);
    width: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: ${(props) =>
      props.$alignstart === "true" ? "flex-start" : "center"};
    gap: 20px;
    margin-bottom: ${(props) => (props.$full !== "true" && "30px")};
  }
`;

export default PageLayout;
