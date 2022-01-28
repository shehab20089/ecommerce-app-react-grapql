import React, { Component } from "react";
import {
  CategoryTitle,
  ProductPageContainer,
  ProductsListContainer,
} from "./ProductsList.styles";
import { fetchProductsByCategoryAsync } from "../../Store/Products/Products.slice";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  updateProductInCart,
} from "../../Store/Cart/Cart.slice";
import {
  showNotification,
  changeAppNumberIsLoading,
} from "../../Store/Globals/global.slice";

class ProductsList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title)
      this.props.fetchProductsByCategoryAsync(this.props.title);
  }
  async componentDidMount() {
    if (this.props.title) {
      this.props.changeAppNumberIsLoading(1);
      await this.props.fetchProductsByCategoryAsync(this.props.title);
      this.props.changeAppNumberIsLoading(-1);
    }
  }
  handleAddToCart = (product) => {
    const cartProduct = JSON.parse(JSON.stringify(product));
    this.props.addItemToCart(cartProduct);
    this.props.showNotification({
      duration: 5000,
      text: `${cartProduct.quantity} ${
        cartProduct.brand + " " + cartProduct.name
      } Added To the Cart`,
    });
  };

  render() {
    const { title, productsList } = this.props;
    return (
      <ProductPageContainer>
        <CategoryTitle>{title}</CategoryTitle>

        <ProductsListContainer>
          {productsList.map((p) => (
            <Link to={`product/${p.id}`} key={p.id}>
              <ProductCard
                onAddClicked={this.handleAddToCart}
                product={p}
              ></ProductCard>
            </Link>
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
      return price.currency.symbol === state.currencies.selectedCurrency.symbol;
    });
    if (mappedProduct.attributes) {
      mappedProduct.attributes = mappedProduct.attributes.map((attribute) => {
        const newAttribute = { ...attribute };

        newAttribute.selectedItem = attribute.items[0];
        return newAttribute;
      });
    }
    return mappedProduct;
  }),
});

const mapDispatchToProps = {
  fetchProductsByCategoryAsync,
  updateProductInCart,
  addItemToCart,
  changeAppNumberIsLoading,
  showNotification,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
