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
} from "./ProductPage.styles";
import {
  fetchProductByIdAsync,
  restSelectedProducts,
} from "../../Store/Products/Products.slice";

import { connect } from "react-redux";
import { withParams } from "../../router";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { BaseButton } from "../../components/Base";
import AttributeSelector from "../../components/ِAttributeSelector/AttributeSelector";

class ProductsPage extends Component {
  async componentDidMount() {
    await this.props.fetchProductByIdAsync(this.props.params.id);
  }
  componentWillUnmount() {
    this.props.restSelectedProducts();
  }
  handleAttributeChange = (item) => {
    console.log(item);
  };
  render() {
    const { id, name, brand, gallery, attributes, currentPrice, description } =
      this.props.currentProduct;
    console.log(currentPrice);

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
          <BaseButton size={{ height: "52px", font: "0.9rem" }}>
            Add to card
          </BaseButton>
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
      return price.currency.symbol == state.currencies.selectedCurrency.symbol;
    });
  }

  return {
    currentProduct: mappedProduct,
  };
};
const mapDispatchToProps = { fetchProductByIdAsync, restSelectedProducts };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(ProductsPage));
