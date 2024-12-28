import React from "react";
import { Outlet } from "react-router-dom";
import PageLayout from "./PageLayout";

const PublicLayout = () => {
  return (
    <PageLayout isExternal={true} full={true}>
      <Outlet />
    </PageLayout>
  );
};

export default PublicLayout;
