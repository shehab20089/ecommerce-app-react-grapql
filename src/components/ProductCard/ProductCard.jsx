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
import cartIcon from "../../assets/images/whiteCartIcon.svg";
import AttributeSelector from "../ِAttributeSelector/AttributeSelector";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { currentProduct: this.props.product };
  }
  stopAttributePropagation = (e) => {
    e.preventDefault();
  };
  componentDidUpdate(prevProp, prevState) {
    // simple objects deep comparison
    if (JSON.stringify(this.props.product) !== JSON.stringify(prevProp.product))
      this.setState({
        currentProduct: this.props.product,
      });
  }

  handleAttributeChange = (item, attributeId) => {
    // deep copy
    const updatedProduct = JSON.parse(
      JSON.stringify(this.state.currentProduct)
    );
    const attributeIndex = updatedProduct.attributes.findIndex(
      (a) => a.id == attributeId
    );
    updatedProduct.attributes[attributeIndex].selectedItem = item;
    console.log(updatedProduct);
    this.setState({ currentProduct: updatedProduct });
    this.props.onProductChange(updatedProduct);
  };
  handleAddToCart = () => {
    this.props.onAddClicked(this.state.currentProduct);
  };
  handleQuantityChange(operation) {
    const updatedQuantity =
      operation == "+"
        ? this.state.currentProduct.quantity + 1
        : this.state.currentProduct.quantity - 1;
    const updatedProduct = JSON.parse(
      JSON.stringify(this.state.currentProduct)
    );
    updatedProduct.quantity = updatedQuantity;
    console.log(this.state.currentProduct);
    this.setState({ currentProduct: updatedProduct });
    this.props.onProductChange(updatedProduct);
  }

  render() {
    const { name, currentPrice, gallery, attributes, isInCart, quantity } =
      this.props.product;
    return (
      <ProductCardContainer>
        <ProductCardAvatar src={gallery[0]}></ProductCardAvatar>
        <ProductCardDescription>
          <ProductCardActions>
            <ProductCardCartBtn onClick={this.stopAttributePropagation}>
              <AttributesOverlay>
                <OverlayTitle>{name}</OverlayTitle>
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
                {isInCart ? (
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
                      size={{
                        height: "30px",
                        width: "30px",
                        fontSize: "1.5rem",
                      }}
                    >
                      -
                    </QuantityBtn>
                  </QuantityContainer>
                ) : (
                  <BaseButton
                    size={{ height: "30px" }}
                    onClick={this.handleAddToCart}
                  >
                    Add to Cart
                  </BaseButton>
                )}
              </AttributesOverlay>

              <Icon
                size={{ width: "30px", height: "30px" }}
                icon={cartIcon}
              ></Icon>
            </ProductCardCartBtn>
          </ProductCardActions>
          <ProductCardTitle>{name}</ProductCardTitle>
          <ProductCardPrice>
            {currentPrice.currency.symbol}
            &nbsp;
            {currentPrice.amount}
          </ProductCardPrice>
        </ProductCardDescription>
      </ProductCardContainer>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object,
};
