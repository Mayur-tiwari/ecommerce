import React from 'react';
import logo from "../../images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { ReactNavbar } from "overlay-navbar";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="black"
      burgerColorHover="tomato"
      navColor1="rgb(255,255,255)"
      logo={logo}
      logoWidth="20vmax"
      logoHoverSize="10px"
      logoHoverColor="red"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.5vmax"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIconUrl="/login"
      profileIcon={true}
      profileIconColor="rgba(35, 35, 35,0.8)"
      searchIconColor="rgba(35, 35, 35,0.8)"
      cartIconColor="rgba(35, 35, 35,0.8)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
      ProfileIconElement={MdAccountCircle}
      searchIcon={true}
      SearchIconElement={MdSearch}
      cartIcon={true}
      CartIconElement={MdAddShoppingCart}
    />
  )
}

export default Header;