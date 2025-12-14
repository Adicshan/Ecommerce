import React from "react";
import TopBar from "../TopBar";
import { Outlet } from "react-router-dom";

export default function UserLayout({ cartCount }) {
  return (
    <>
      <TopBar cartCount={cartCount}  />
      <Outlet />
    </>
  );
}
