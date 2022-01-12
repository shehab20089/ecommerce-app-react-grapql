import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default class BaseLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );
  }
}
