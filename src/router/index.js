import { Routes, Route, useParams } from "react-router-dom";
import { BaseLayout } from "../layouts";
import { ProductsListPage, ProductPage, CartPage } from "../pages";
import React, { Component } from "react";

export default class PageRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<ProductsListPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart/" element={<CartPage />} />
        </Route>
      </Routes>
    );
  }
}
// forced to use the hooks here
// to fix the issue with react-router-dom v6+ not supporting react class components any more and removing higher order function withRouter
export function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
