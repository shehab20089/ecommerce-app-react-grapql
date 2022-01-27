import React, { Component } from "react";
import {
  ProductPageContainer,
  ProductPageInfo,
  ProductPageInfoTitle,
  ProductPageInfoBrand,
  ProductPageInfoName,
  ProductPagePriceContainer,
  ProductPagePriceTitle,
  ProductPagePriceValue,
  ProductPageDescription,
  QuantityBtn,
  QuantityContainer,
  ProductPageErrorTitle,
} from "./ProductPage.styles";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { BaseButton } from "../../components/Base";
import AttributeSelector from "../../components/ِAttributeSelector/AttributeSelector";
import {
  fetchProductByIdAsync,
  restSelectedProducts,
} from "../../Store/Products/Products.slice";
import {
  addItemToCart,
  updateProductInCart,
} from "../../Store/Cart/Cart.slice";
import { connect } from "react-redux";
import { withParams } from "../../router";
import { changeAppNumberIsLoading } from "../../Store/Globals/global.slice";

class ProductsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartObject: JSON.parse(JSON.stringify(this.props.currentProduct)),
    };
  }

  async componentDidMount() {
    this.props.changeAppNumberIsLoading(1);
    await this.props.fetchProductByIdAsync(this.props.params.id);
    this.props.changeAppNumberIsLoading(-1);

    if (this.props.currentProduct.id !== this.state.cartObject)
      this.setState({
        // deep copy
        cartObject: JSON.parse(JSON.stringify(this.props.currentProduct)),
      });
  }
  componentDidUpdate(preProps) {
    if (
      JSON.stringify(preProps.currentProduct) !==
      JSON.stringify(this.props.currentProduct)
    ) {
      this.setState({
        // deep copy
        cartObject: JSON.parse(JSON.stringify(this.props.currentProduct)),
      });
    }
  }
  componentWillUnmount() {
    this.props.restSelectedProducts();
  }
  handleAttributeChange = (item, attributeId) => {
    // deep copy
    const updatedProduct = JSON.parse(JSON.stringify(this.state.cartObject));
    const attributeIndex = updatedProduct.attributes.findIndex(
      (a) => a.id === attributeId
    );
    updatedProduct.attributes[attributeIndex].selectedItem = item;
    this.setState({
      cartObject: updatedProduct,
    });
    this.props.updateProductInCart(updatedProduct);
  };
  handleAddToCart = () => {
    const cartProduct = JSON.parse(JSON.stringify(this.state.cartObject));
    cartProduct.quantity = 1;
    this.props.addItemToCart(cartProduct);
  };
  handleQuantityChange(operation) {
    const updatedQuantity =
      operation === "+"
        ? this.state.cartObject.quantity + 1
        : this.state.cartObject.quantity - 1;
    const updatedProduct = JSON.parse(JSON.stringify(this.state.cartObject));
    updatedProduct.quantity = updatedQuantity;
    this.setState({ cartObject: updatedProduct });
    this.props.updateProductInCart(updatedProduct);
  }
  renderInStock = () => {
    const inStock = this.props.currentProduct.inStock;
    if (!inStock)
      return (
        <ProductPageErrorTitle>Product is out of stock</ProductPageErrorTitle>
      );
    else {
      if (this.props.cartData.id) {
        return (
          <QuantityContainer>
            <QuantityBtn
              onClick={() => this.handleQuantityChange("+")}
              size={{
                height: "30px",
                width: "30px",
                fontSize: "1.5rem",
              }}
            >
              +
            </QuantityBtn>
            {this.props.cartData.quantity}
            <QuantityBtn
              onClick={() => this.handleQuantityChange("-")}
              size={{
                height: "30px",
                width: "30px",
                fontSize: "1.5rem",
              }}
            >
              -
            </QuantityBtn>
          </QuantityContainer>
        );
      }
    }

    return (
      <BaseButton
        onClick={this.handleAddToCart}
        size={{ height: "52px", font: "0.9rem" }}
      >
        Add to card
      </BaseButton>
    );
  };
  render() {
    const { name, brand, gallery, attributes, currentPrice, description } =
      this.props.currentProduct;

    return (
      <ProductPageContainer>
        <ImageGallery images={gallery}></ImageGallery>
        <ProductPageInfo>
          <ProductPageInfoTitle>
            <ProductPageInfoBrand>{brand}</ProductPageInfoBrand>
            <ProductPageInfoName>{name}</ProductPageInfoName>
          </ProductPageInfoTitle>
          {attributes.map((attribute) => {
            return (
              <AttributeSelector
                attribute={attribute}
                key={attribute.id}
                onAttributeChange={this.handleAttributeChange}
              ></AttributeSelector>
            );
          })}
          <ProductPagePriceContainer>
            <ProductPagePriceTitle>Price:</ProductPagePriceTitle>
            {currentPrice ? (
              <ProductPagePriceValue>
                {currentPrice.currency.symbol}&nbsp;{currentPrice.amount}
              </ProductPagePriceValue>
            ) : null}
          </ProductPagePriceContainer>

          {this.renderInStock()}

          <ProductPageDescription
            dangerouslySetInnerHTML={{ __html: description }}
          ></ProductPageDescription>
        </ProductPageInfo>
      </ProductPageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const currentProduct = state.products.selectedProduct;
  const mappedProduct = {};
  Object.assign(mappedProduct, currentProduct);

  if (currentProduct.prices) {
    mappedProduct.currentPrice = mappedProduct.prices.find((price) => {
      return price.currency.symbol === state.currencies.selectedCurrency.symbol;
    });
  }
  const productInCart = state.cart.cart.find(
    (item) => item.id === mappedProduct.id
  );
  const isItemInCart = productInCart ? true : false;
  if (isItemInCart) mappedProduct.quantity = productInCart.quantity;
  if (currentProduct.attributes) {
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

  return {
    currentProduct: mappedProduct,
    cartData: isItemInCart ? productInCart : {},
    isItemInCart: isItemInCart,
  };
};
const mapDispatchToProps = {
  fetchProductByIdAsync,
  restSelectedProducts,
  addItemToCart,
  updateProductInCart,
  changeAppNumberIsLoading,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(ProductsPage));
