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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchCategoriesAsync();
    this.props.fetchCurrenciesAsync();
  }

  handleNavChange = (activeLink) => {
    this.props.selectCategory(activeLink);
  };

  render() {
    const { selectedCategory, categories } = this.props.categories;
    const { selectedCurrency, currencies } = this.props.currencies;

    return (
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
          <OverLayContainer>
            <Icon
              size={{ width: "20px", height: "20px" }}
              icon={cartIcon}
            ></Icon>
          </OverLayContainer>
        </ActionsContainer>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  menu: PropTypes.array,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  currencies: state.currencies,
});

const mapDispatchToProps = {
  selectCategory,
  fetchCategoriesAsync,
  changeCurrency,
  fetchCurrenciesAsync,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
