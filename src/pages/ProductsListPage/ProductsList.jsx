import React, { Component } from "react";
import {
  CategoryTitle,
  ProductPageContainer,
  ProductsListContainer,
} from "./ProductsList.styles";

import { fetchProductsByCategoryAsync } from "../../Store/Products/Products.slice";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";

class ProductsList extends Component {
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
        {
          name: "Hello Mother Fuckers ",
          price: "$50",
          image: "",
        },
      ],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.title != prevProps.title)
      this.props.fetchProductsByCategoryAsync(this.props.title);
  }

  render() {
    const { title, productsList } = this.props;
    return (
      <ProductPageContainer>
        <CategoryTitle>{title}</CategoryTitle>

        <ProductsListContainer>
          {productsList.map((p) => (
            <ProductCard key={p.id} product={p}></ProductCard>
          ))}
        </ProductsListContainer>
      </ProductPageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.categories.selectedCategory,
  productsList: state.products.products,
});
const mapDispatchToProps = { fetchProductsByCategoryAsync };
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
