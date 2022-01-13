import React, { Component } from "react";
import {
  CategoryTitle,
  ProductPageContainer,
  ProductsListContainer,
  ProductCard,
  ProductCardAvatar,
  ProductCardDescription,
  ProductCardTitle,
  ProductCardPrice,
  ProductCardActions,
  ProductCardCartBtn,
} from "./ProductsList.styles";
import { Icon } from "../../components/Base";
import image from "../../assets/images/Image.png";
import cartIcon from "../../assets/images/whiteCartIcon.svg";

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          name: "ffff",
          price: 50,
          image: "",
        },
        {
          name: "ffff",
          price: 50,
          image: "",
        },
        {
          name: "ffff",
          price: 50,
          image: "",
        },
        {
          name: "ffff",
          price: 50,
          image: "",
        },
      ],
    };
  }
  render() {
    const { products } = this.state;
    return (
      <ProductPageContainer>
        <CategoryTitle>Category Name</CategoryTitle>

        <ProductsListContainer>
          {products.map((p) => (
            <ProductCard>
              <ProductCardAvatar src={image} />
              <ProductCardDescription>
                <ProductCardActions>
                  <ProductCardCartBtn>
                    <Icon
                      size={{ width: "30px", height: "30px" }}
                      icon={cartIcon}
                    ></Icon>
                  </ProductCardCartBtn>
                </ProductCardActions>
                <ProductCardTitle>Pla</ProductCardTitle>
                <ProductCardPrice>$50</ProductCardPrice>
              </ProductCardDescription>
            </ProductCard>
          ))}
        </ProductsListContainer>
      </ProductPageContainer>
    );
  }
}
