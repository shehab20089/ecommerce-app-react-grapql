import React, { Component } from "react";
import {
  CategoryTitle,
  ProductPageContainer,
  ProductsListContainer,
} from "./ProductsList.styles";
import { fetchProductsByCategoryAsync } from "../../Store/Products/Products.slice";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";

class ProductsList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.title != prevProps.title)
      this.props.fetchProductsByCategoryAsync(this.props.title);
  }

  render() {
    const { title, productsList } = this.props;
    return (
      <ProductPageContainer>
        <CategoryTitle>{title}</CategoryTitle>

        <ProductsListContainer>
          {productsList.map((p) => (
            <ProductCard key={p.id} product={p}></ProductCard>
          ))}
        </ProductsListContainer>
      </ProductPageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.categories.selectedCategory,
  productsList: state.products.products.map((product) => {
    const mappedProduct = {};
    Object.assign(mappedProduct, product);
    mappedProduct.currentPrice = mappedProduct.prices.find((price) => {
      return price.currency.symbol == state.currencies.selectedCurrency.symbol;
    });
    return mappedProduct;
  }),
});
const mapDispatchToProps = { fetchProductsByCategoryAsync };
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
