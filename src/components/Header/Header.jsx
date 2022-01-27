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
import downArrowIcon from "../../assets/icons/downArrow.svg";
import cartIcon from "../../assets/icons/EmptyCart.svg";
import {
  fetchCategoriesAsync,
  selectCategory,
} from "../../Store/Categories/categories.slice";
import {
  fetchCurrenciesAsync,
  changeCurrency,
} from "../../Store/Currency/Currency.slice";
import { fetchCart, updateProductInCart } from "../../Store/Cart/Cart.slice";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import { BaseButton } from "../Base";
import { localStorageConstants } from "../../constants";
import { changeAppNumberIsLoading } from "../../Store/Globals/global.slice";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showOverlay: false, showCurrency: false };
  }
  async componentDidMount() {
    this.props.changeAppNumberIsLoading(1);
    await this.props.fetchCategoriesAsync();
    await this.props.fetchCurrenciesAsync();
    this.props.changeAppNumberIsLoading(-1);

    const cartItems = JSON.parse(
      localStorage.getItem(localStorageConstants.CART_PRODUCTS)
    );
    if (cartItems) this.props.fetchCart(cartItems);
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
  handleProductChanges = (updatedProduct) => {
    this.props.updateProductInCart(updatedProduct);
  };
  handleCurrencyChange = (currency) => {
    this.props.changeCurrency(currency);
    this.setState({ showCurrency: false });
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
                  active={selectedCategory === category.name}
                  key={category.name}
                  onClick={() => this.handleNavChange(category.name)}
                >
                  <Link to="/">
                    <MenuListItemLink>{category.name}</MenuListItemLink>
                  </Link>
                </MenuListItem>
              );
            })}
          </MenuList>
          <Link to="/">
            <LogoContainer></LogoContainer>
          </Link>
          <ActionsContainer>
            <CurrencyContainer
              onClick={() =>
                this.setState({ showCurrency: !this.state.showCurrency })
              }
            >
              {selectedCurrency.symbol}
              <Icon
                size={{ width: "8px", height: "8px" }}
                icon={downArrowIcon}
              ></Icon>
              <CurrencyDropDownContainer showCurrency={this.state.showCurrency}>
                {currencies.map((currency) => {
                  return (
                    <CurrencyDropDownItem
                      key={currency.symbol}
                      onClick={() => this.handleCurrencyChange(currency)}
                    >
                      {currency.symbol}&nbsp;{currency.label}
                    </CurrencyDropDownItem>
                  );
                })}
              </CurrencyDropDownContainer>
            </CurrencyContainer>
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
                      onCartProductChanges={this.handleProductChanges}
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
    // adding custom property currentPrice which change with the currency change
    mappedProduct.currentPrice = mappedProduct.prices.find((price) => {
      return price.currency.symbol === state.currencies.selectedCurrency.symbol;
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
  fetchCart,
  updateProductInCart,
  changeAppNumberIsLoading,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
