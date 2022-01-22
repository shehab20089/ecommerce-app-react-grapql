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

class ProductsList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.title != prevProps.title)
      this.props.fetchProductsByCategoryAsync(this.props.title);
  }
  componentDidMount() {
    if (this.props.title)
      this.props.fetchProductsByCategoryAsync(this.props.title);
  }
  handleProductUpdate = (updatedProduct) => {
    this.props.updateProductInCart(updatedProduct);
  };
  handleAddToCart = (product) => {
    const cartProduct = JSON.parse(JSON.stringify(product));
    cartProduct.quantity = 1;
    this.props.addItemToCart(cartProduct);
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
                onProductChange={this.handleProductUpdate}
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
      return price.currency.symbol == state.currencies.selectedCurrency.symbol;
    });
    // check product in cart
    const productInCart = state.cart.cart.find(
      (item) => item.id == mappedProduct.id
    );
    const isItemInCart = productInCart ? true : false;
    mappedProduct.isInCart = isItemInCart;
    // if in cart add quantity and attribute properties
    if (isItemInCart) mappedProduct.quantity = productInCart.quantity;
    if (mappedProduct.attributes) {
      mappedProduct.attributes = mappedProduct.attributes.map(
        (attribute, index) => {
          const newAttribute = { ...attribute };

          newAttribute.selectedItem = !isItemInCart
            ? attribute.items[0]
            : productInCart.attributes[index].selectedItem;
          return newAttribute;
        }
      );
    }
    return mappedProduct;
  }),
});

const mapDispatchToProps = {
  fetchProductsByCategoryAsync,
  updateProductInCart,
  addItemToCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
