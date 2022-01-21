import React, { Component } from "react";
import {
  CartPageContainer,
  CartPageTitle,
  CartItemsContainer,
} from "./CartPage.styles";
import { connect } from "react-redux";
import { updateProductInCart } from "../../Store/Cart/Cart.slice";
import CartItem from "../../components/CartItem/CartItem";

class CartPage extends Component {
  handleAttributeChange = (updatedProduct) => {
    this.props.updateProductInCart(updatedProduct);
  };
  handleQuantityChange = (updatedProduct) => {
    this.props.updateProductInCart(updatedProduct);
  };
  render() {
    const { cartProducts } = this.props;

    return (
      <CartPageContainer>
        <CartPageTitle>Cart </CartPageTitle>
        <CartItemsContainer>
          {cartProducts.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onAttributeChanged={this.handleAttributeChange}
              onQuantityChanges={this.handleQuantityChange}
            ></CartItem>
          ))}
        </CartItemsContainer>
      </CartPageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const products = state.cart.cart.map((product) => {
    const mappedProduct = JSON.parse(JSON.stringify(product));
    mappedProduct.currentPrice = mappedProduct.prices.find((price) => {
      return price.currency.symbol == state.currencies.selectedCurrency.symbol;
    });
    return mappedProduct;
  });

  return {
    cartProducts: products,
  };
};
const mapDispatchToProps = {
  updateProductInCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
