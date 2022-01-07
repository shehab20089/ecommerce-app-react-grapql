import { Routes, Route } from "react-router-dom";
import { BaseLayout } from "../layouts";
import { ProductsListPage } from "../pages";
import React, { Component } from "react";

export default class PageRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<ProductsListPage />} />
        </Route>
      </Routes>
    );
  }
}
