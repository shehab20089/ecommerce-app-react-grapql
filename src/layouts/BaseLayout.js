import React, { Component } from "react";
import { Outlet } from "react-router-dom";

export default class BaseLayout extends Component {
  render() {
    return (
      <div>
        hello
        <Outlet />
      </div>
    );
  }
}
