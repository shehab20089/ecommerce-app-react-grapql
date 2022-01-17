import React, { Component } from "react";
import { Icon } from "../Base";
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
      (a) => a.id == attributeId
    );
    updatedProduct.attributes[attributeIndex].selectedItem = item;

    this.props.onAttributeChanged(updatedProduct);
  };
  handleQuantityChange(operation) {
    const updatedQuantity =
      operation == "+"
        ? this.props.product.quantity + 1
        : this.props.product.quantity - 1;
    const updatedProduct = JSON.parse(JSON.stringify(this.props.product));
    updatedProduct.quantity = updatedQuantity;

    this.props.onQuantityChanges(updatedProduct);
  }
  render() {
    const { brand, name, currentPrice, attributes, quantity, gallery } =
      this.props.product;
    return (
      <CartItemsContainer>
        <CartItemInfoCol1>
          <CartItemHeader>
            <CartItemBrand>{brand}</CartItemBrand>
            <CartItemName>{name}</CartItemName>
          </CartItemHeader>
          <CartItemPrice>
            {currentPrice.currency.symbol}
            &nbsp;
            {Number.parseFloat(currentPrice.amount * quantity).toFixed(2)}
          </CartItemPrice>
          <CartItemOptionsContainer>
            {attributes.map((attribute) => (
              <AttributeSelector
                key={attribute.name}
                onAttributeChange={this.handleAttributeChange}
                attribute={attribute}
              ></AttributeSelector>
            ))}
          </CartItemOptionsContainer>
        </CartItemInfoCol1>
        <CartItemInfoCol2>
          <CartItemQuantityContainer>
            <QuantityButton
              onClick={() => this.handleQuantityChange("+")}
              size={{ height: "45px", width: "45px" }}
            >
              +
            </QuantityButton>
            <QuantityAmount>{quantity}</QuantityAmount>
            <QuantityButton
              onClick={() => this.handleQuantityChange("-")}
              size={{ height: "45px", width: "45px" }}
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
