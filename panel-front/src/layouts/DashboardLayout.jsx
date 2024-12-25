import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectHeadcrumbs } from "../context/sessionSlice";
import PageLayout from "./PageLayout";

const DashboardLayout = ({ full = false }) => {
  const headcrumbs = useSelector(selectHeadcrumbs);
  document.body.style.backgroundColor = "var(--bg-dashboard)";

  return (
    <PageLayout bgColor="var(--bg-dashboard)" alignStart={true} full={full}>
      <Headcrumbs>
        {headcrumbs.map((h, i, src) => {
          return (
            <Headcrumb key={i} $hasnav={h.nav ? "true" : "false"}>
              <a href={h.nav}>{h.text}</a>
              {src.length - 1 !== i && <p className="arrow">{">"}</p>}
            </Headcrumb>
          );
        })}
      </Headcrumbs>
      <Outlet />
    </PageLayout>
  );
};

const Headcrumbs = styled.div`
  display: flex;
  font-style: italic;
  gap: 10px;
  font-weight: 500;
`;

const Headcrumb = styled.div`
  display: flex;
  gap: 10px;
  user-select: none;

  a {
    color: var(--secondary-color);
    font-size: 18px;
    text-decoration: none;
    cursor: ${(props) => (props.$hasnav === "true" ? "pointer" : "default")};
  }

  .arrow {
    font-size: 16px;
    font-weight: 400;
  }
`;

export default DashboardLayout;
