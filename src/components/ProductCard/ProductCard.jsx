import React, { Component } from "react";
import {
  ProductCardContainer,
  ProductCardAvatar,
  ProductCardDescription,
  ProductCardTitle,
  ProductCardPrice,
  ProductCardActions,
  ProductCardCartBtn,
  AttributesOverlay,
  QuantityContainer,
  QuantityBtn,
  OverlayTitle,
} from "./ProductCard.styles";
import PropTypes from "prop-types";
import { BaseButton, Icon } from "../Base";
import cartIcon from "../../assets/icons/whiteCartIcon.svg";
import AttributeSelector from "../ِAttributeSelector/AttributeSelector";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { currentProduct: { ...this.props.product, quantity: 1 } };
  }
  stopAttributePropagation = (e) => {
    e.preventDefault();
  };
  handleAttributeChange = (item, attributeId) => {
    // deep copy
    const updatedProduct = JSON.parse(
      JSON.stringify(this.state.currentProduct)
    );
    const attributeIndex = updatedProduct.attributes.findIndex(
      (a) => a.id === attributeId
    );
    updatedProduct.attributes[attributeIndex].selectedItem = item;
    this.setState({ currentProduct: updatedProduct });
  };
  handleAddToCart = () => {
    this.props.onAddClicked(this.state.currentProduct);
  };
  handleQuantityChange(operation) {
    const updatedQuantity =
      operation === "+"
        ? this.state.currentProduct.quantity + 1
        : this.state.currentProduct.quantity - 1;
    const updatedProduct = JSON.parse(
      JSON.stringify(this.state.currentProduct)
    );
    updatedProduct.quantity = updatedQuantity;
    this.setState({ currentProduct: updatedProduct });
  }

  render() {
    const { name, brand, currentPrice, gallery, attributes, inStock } =
      this.props.product;
    const { quantity } = this.state.currentProduct;
    return (
      <ProductCardContainer isInStock={inStock}>
        <ProductCardAvatar
          isInStock={inStock}
          src={gallery[0]}
        ></ProductCardAvatar>
        <ProductCardDescription>
          <ProductCardActions>
            <ProductCardCartBtn
              isInStock={inStock}
              onClick={this.stopAttributePropagation}
            >
              <AttributesOverlay>
                <OverlayTitle>{brand + " " + name}</OverlayTitle>
                {attributes.map((attribute) => {
                  return (
                    <AttributeSelector
                      attribute={attribute}
                      size="mini"
                      key={attribute.id}
                      onAttributeChange={this.handleAttributeChange}
                    ></AttributeSelector>
                  );
                })}

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
                  {quantity}
                  <QuantityBtn
                    onClick={() => this.handleQuantityChange("-")}
                    disabled={quantity <= 1}
                    size={{
                      height: "30px",
                      width: "30px",
                      fontSize: "1.5rem",
                    }}
                  >
                    -
                  </QuantityBtn>
                </QuantityContainer>

                <BaseButton
                  size={{ height: "30px" }}
                  onClick={this.handleAddToCart}
                >
                  Add to Cart
                </BaseButton>
              </AttributesOverlay>

              <Icon
                size={{ width: "30px", height: "30px" }}
                icon={cartIcon}
              ></Icon>
            </ProductCardCartBtn>
          </ProductCardActions>
          <ProductCardTitle>{brand + " " + name}</ProductCardTitle>
          {currentPrice ? (
            <ProductCardPrice>
              {currentPrice.currency.symbol}
              &nbsp;
              {currentPrice.amount}
            </ProductCardPrice>
          ) : null}
        </ProductCardDescription>
      </ProductCardContainer>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object,
};
