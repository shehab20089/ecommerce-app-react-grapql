import React, { Component } from "react";
import AttributeSelector from "../ِAttributeSelector/AttributeSelector";

import {
  CartItemsContainer,
  CartItemInfoCol1,
  CartItemBrand,
  CartItemName,
  CartItemPrice,
  CartItemInfoCol2,
  CartItemQuantityContainer,
  QuantityButton,
  CartItemOptionsContainer,
  QuantityAmount,
  CartItemHeader,
} from "./CartItem.styles";

import ImageSlider from "../ImageSlider/ImageSlider";
export default class CartItem extends Component {
  handleAttributeChange = (item, attributeId) => {
    // deep copy
    const updatedProduct = JSON.parse(JSON.stringify(this.props.product));
    const attributeIndex = updatedProduct.attributes.findIndex(
      (a) => a.id === attributeId
    );
    updatedProduct.attributes[attributeIndex].selectedItem = item;
    this.props.onCartProductChanges(updatedProduct);
  };
  handleQuantityChange = (operation) => {
    const updatedQuantity =
      operation === "+"
        ? this.props.product.quantity + 1
        : this.props.product.quantity - 1;
    const updatedProduct = JSON.parse(JSON.stringify(this.props.product));
    updatedProduct.quantity = updatedQuantity;

    this.props.onCartProductChanges(updatedProduct);
  };
  render() {
    const { brand, name, currentPrice, attributes, quantity, gallery } =
      this.props.product;
    const { size } = this.props;
    return (
      <CartItemsContainer size={size}>
        <CartItemInfoCol1>
          <CartItemHeader>
            <CartItemBrand size={size}>{brand}</CartItemBrand>
            <CartItemName size={size}>{name}</CartItemName>
          </CartItemHeader>
          <CartItemPrice size={size}>
            {currentPrice.currency.symbol}
            &nbsp;
            {Number.parseFloat(currentPrice.amount).toFixed(2)}
          </CartItemPrice>
          <CartItemOptionsContainer>
            {attributes.map((attribute) => (
              <AttributeSelector
                size={size}
                key={attribute.name}
                onAttributeChange={this.handleAttributeChange}
                hideUnselected={true}
                attribute={attribute}
              ></AttributeSelector>
            ))}
          </CartItemOptionsContainer>
        </CartItemInfoCol1>
        <CartItemInfoCol2>
          <CartItemQuantityContainer size={size}>
            <QuantityButton
              onClick={() => this.handleQuantityChange("+")}
              size={{
                height: size !== "mini" ? "45px" : "24px",
                width: size !== "mini" ? "45px" : "24px",
                fontSize: size !== "mini" ? "2.5rem" : "1.3rem",
              }}
            >
              +
            </QuantityButton>
            <QuantityAmount size={size}>{quantity}</QuantityAmount>
            <QuantityButton
              onClick={() => this.handleQuantityChange("-")}
              size={{
                height: size !== "mini" ? "45px" : "24px",
                width: size !== "mini" ? "45px" : "24px",
                fontSize: size !== "mini" ? "2.5rem" : "1.3rem",
                mode: size,
              }}
            >
              -
            </QuantityButton>
          </CartItemQuantityContainer>
          <ImageSlider gallery={gallery}></ImageSlider>
        </CartItemInfoCol2>
      </CartItemsContainer>
    );
  }
}
