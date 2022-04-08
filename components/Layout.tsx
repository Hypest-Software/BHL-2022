/* This example requires Tailwind CSS v2.0+ */
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { User } from "../services/models/User";

interface LayoutProps {
  user: User;
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <div className="min-h-full">
        <Navbar user={props.user} />
        <main>{props.children}</main>
      </div>
    </>
  );
}
