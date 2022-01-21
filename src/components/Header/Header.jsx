import React, { Component } from "react";
import {
  StyledHeader,
  MenuList,
  MenuListItem,
  MenuListItemLink,
  LogoContainer,
  ActionsContainer,
  Icon,
  CurrencyContainer,
  OverLayContainer,
  CurrencyDropDownContainer,
  CurrencyDropDownItem,
  CartDropDownContainer,
  PageOverlay,
  CartDropDownTitle,
  CartDropDownTitleSpan,
  CartProductsContainer,
  CartDropdownActions,
  TotalPriceContainer,
  TotalPriceLabel,
  TotalPriceAmount,
  IconBadge,
} from "./Header.styles";
import downArrowIcon from "../../assets/images/Vector.svg";
import cartIcon from "../../assets/images/EmptyCart.svg";
import {
  fetchCategoriesAsync,
  selectCategory,
} from "../../Store/Categories/categories.slice";
import {
  fetchCurrenciesAsync,
  changeCurrency,
} from "../../Store/Currency/Currency.slice";
import { updateProductInCart } from "../../Store/Cart/Cart.slice";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import { BaseButton } from "../Base";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showOverlay: false };
  }
  componentDidMount() {
    this.props.fetchCategoriesAsync();
    this.props.fetchCurrenciesAsync();
  }
  handleShowOverLay = () => {
    if (!this.state.showOverlay) {
      const body = document.body;
      body.style.position = "fixed";
      body.style.width = "100vw";
    } else {
      const body = document.body;
      body.style.position = "";
      body.style.width = "auto";
    }
    this.setState({ showOverlay: !this.state.showOverlay });
  };
  handleNavChange = (activeLink) => {
    this.props.selectCategory(activeLink);
  };
  handleAttributeChange = (updatedProduct) => {
    this.props.updateProductInCart(updatedProduct);
  };
  handleQuantityChange = (updatedProduct) => {
    this.props.updateProductInCart(updatedProduct);
  };

  render() {
    const { selectedCategory, categories } = this.props.categories;
    const { selectedCurrency, currencies } = this.props.currencies;
    const { numberOfItemsInCart, cartProducts, totalAmount } = this.props;

    return (
      <>
        <PageOverlay
          onClick={this.handleShowOverLay}
          showOverlay={this.state.showOverlay}
        ></PageOverlay>
        <StyledHeader>
          <MenuList>
            {categories.map((category) => {
              return (
                <MenuListItem
                  active={selectedCategory == category.name}
                  key={category.name}
                  onClick={() => this.handleNavChange(category.name)}
                >
                  <MenuListItemLink>{category.name}</MenuListItemLink>
                </MenuListItem>
              );
            })}
          </MenuList>
          <Link to="/">
            <LogoContainer></LogoContainer>
          </Link>
          <ActionsContainer>
            <CurrencyContainer>
              {selectedCurrency.symbol}
              <Icon
                size={{ width: "8px", height: "8px" }}
                icon={downArrowIcon}
              ></Icon>
              <CurrencyDropDownContainer>
                {currencies.map((currency) => {
                  return (
                    <CurrencyDropDownItem
                      key={currency.symbol}
                      onClick={() => this.props.changeCurrency(currency)}
                    >
                      {currency.symbol}&nbsp;{currency.label}
                    </CurrencyDropDownItem>
                  );
                })}
              </CurrencyDropDownContainer>
            </CurrencyContainer>
            {/* <Link to="/cart"> */}
            <OverLayContainer>
              <Icon
                onClick={this.handleShowOverLay}
                size={{ width: "20px", height: "20px" }}
                icon={cartIcon}
              >
                {numberOfItemsInCart ? (
                  <IconBadge>{numberOfItemsInCart}</IconBadge>
                ) : null}
              </Icon>
              <CartDropDownContainer showOverlay={this.state.showOverlay}>
                <CartDropDownTitle>
                  My Bag ,{" "}
                  <CartDropDownTitleSpan>
                    {numberOfItemsInCart} items
                  </CartDropDownTitleSpan>
                </CartDropDownTitle>
                <CartProductsContainer>
                  {cartProducts.map((product) => (
                    <CartItem
                      key={product.id}
                      size="mini"
                      product={product}
                      onAttributeChanged={this.handleAttributeChange}
                      onQuantityChanges={this.handleQuantityChange}
                    ></CartItem>
                  ))}
                </CartProductsContainer>
                <TotalPriceContainer>
                  <TotalPriceLabel>Total</TotalPriceLabel>
                  <TotalPriceAmount>
                    {selectedCurrency.symbol}&nbsp;{totalAmount.toFixed(2)}
                  </TotalPriceAmount>
                </TotalPriceContainer>
                <CartDropdownActions>
                  <Link to="/cart" onClick={this.handleShowOverLay}>
                    <BaseButton
                      border="1px solid #1D1F22;"
                      color="black"
                      bgColor="white"
                      size={{ height: "43px", font: "0.8rem" }}
                    >
                      View Bag
                    </BaseButton>
                  </Link>
                  <BaseButton size={{ height: "43px", font: "0.8rem" }}>
                    CheckOut
                  </BaseButton>
                </CartDropdownActions>
              </CartDropDownContainer>
            </OverLayContainer>
            {/* </Link>  */}
          </ActionsContainer>
        </StyledHeader>
      </>
    );
  }
}

Header.propTypes = {
  menu: PropTypes.array,
};

const mapStateToProps = (state) => {
  const products = state.cart.cart.map((product) => {
    const mappedProduct = JSON.parse(JSON.stringify(product));
    mappedProduct.currentPrice = mappedProduct.prices.find((price) => {
      return price.currency.symbol == state.currencies.selectedCurrency.symbol;
    });
    return mappedProduct;
  });
  return {
    categories: state.categories,
    numberOfItemsInCart: state.cart.cart.reduce(
      (sum, cartItem) => sum + cartItem.quantity,
      0
    ),
    currencies: state.currencies,
    cartProducts: products,
    totalAmount: products.reduce((prev, current) => {
      return prev + current.currentPrice.amount * current.quantity;
    }, 0),
  };
};

const mapDispatchToProps = {
  selectCategory,
  fetchCategoriesAsync,
  changeCurrency,
  fetchCurrenciesAsync,
  updateProductInCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
