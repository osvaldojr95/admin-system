import React from "react";
import { Outlet } from "react-router-dom";
import PageLayout from "./PageLayout";

const AuthLayout = () => {
  return (
    <PageLayout noHeader bgColor="var(--bg-auth)">
      <Outlet />
    </PageLayout>
  );
};

export default AuthLayout;
