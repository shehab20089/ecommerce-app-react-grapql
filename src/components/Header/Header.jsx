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
import PropTypes from "prop-types";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        { label: "Women", key: "all" },
        { label: "men", key: "games" },
        { label: "kids    ", key: "products" },
      ],
      activeLink: "all",
    };
  }
  handleNavChange = (activeLink) => {
    this.setState({ ...this.state, activeLink: activeLink });
  };

  render() {
    const { menu, activeLink } = this.state;

    return (
      <StyledHeader>
        <MenuList>
          {menu.map((menuItem) => {
            return (
              <MenuListItem
                active={activeLink == menuItem.key}
                onClick={() => this.handleNavChange(menuItem.key)}
              >
                <MenuListItemLink>{menuItem.label}</MenuListItemLink>
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
