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
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchCategoriesAsync();
  }

  handleNavChange = (activeLink) => {
    this.props.selectCategory(activeLink);
  };

  render() {
    const { selectedCategory, categories } = this.props.categories;

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
        <LogoContainer></LogoContainer>
        <ActionsContainer>
          <CurrencyContainer>
            $
            <Icon
              size={{ width: "8px", height: "8px" }}
              icon={downArrowIcon}
            ></Icon>
            <CurrencyDropDownContainer>
              <CurrencyDropDownItem>items</CurrencyDropDownItem>
              <CurrencyDropDownItem>items</CurrencyDropDownItem>
              <CurrencyDropDownItem>items</CurrencyDropDownItem>
              <CurrencyDropDownItem>items</CurrencyDropDownItem>
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
});

const mapDispatchToProps = { selectCategory, fetchCategoriesAsync };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
