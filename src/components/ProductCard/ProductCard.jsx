import React, { Component } from "react";
import {
  ProductCardContainer,
  ProductCardAvatar,
  ProductCardDescription,
  ProductCardTitle,
  ProductCardPrice,
  ProductCardActions,
  ProductCardCartBtn,
} from "./ProductCard.styles";
import PropTypes from "prop-types";
import { Icon } from "../Base";
import image from "../../assets/images/Image.png";
import cartIcon from "../../assets/images/whiteCartIcon.svg";

export default class ProductCard extends Component {
  render() {
    const { name, price, gallery } = this.props.product;
    return (
      <ProductCardContainer>
        <ProductCardAvatar src={gallery[0]}></ProductCardAvatar>
        <ProductCardDescription>
          <ProductCardActions>
            <ProductCardCartBtn>
              <Icon
                size={{ width: "30px", height: "30px" }}
                icon={cartIcon}
              ></Icon>
            </ProductCardCartBtn>
          </ProductCardActions>
          <ProductCardTitle>{name}</ProductCardTitle>
          <ProductCardPrice>{price}</ProductCardPrice>
        </ProductCardDescription>
      </ProductCardContainer>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object,
};
