import {
  CardMembershipOutlined,
  HelpOutlineOutlined,
  HomeOutlined,
  MenuBookOutlined,
} from "@mui/icons-material";
import { Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/${key}`}>{label}</Link>,
  } as MenuItem;
}

const getConditionalItems = (): MenuItem[] => {
  return [
    getItem("Home", "", <HomeOutlined />),
    getItem("About", "about", <HelpOutlineOutlined />),
    getItem("Courses", "courses", <MenuBookOutlined />),
    getItem("Membership", "membership", <CardMembershipOutlined />),
  ];
};

function Header() {
  const select = useLocation();
  const selected = select.pathname.split("/")[1];

  const menuStyle = {
    backgroundColor: "transparent",
    color: "black",
    borderBottom: "none",
    width: "30%",
  };

  return (
    <header className="bg-gradient-to-b from-white via-gray-200 to-white p-6 flex justify-around items-center border-b-2 max-w-[100vw] h-auto">
      <h1>
        <Link to={"/"} className="text-[#333] text-sm">
          LM ONLINE SYSTEM
        </Link>
      </h1>
      <Menu
        items={getConditionalItems()}
        mode="horizontal"
        defaultSelectedKeys={[selected]}
        style={menuStyle}
      ></Menu>
      <button className="bg-gray-500 border-2 px-5 py-2 text-white rounded-3xl">
        <Link to={"/login"} className=" text-sm">
          Login
        </Link>
      </button>
    </header>
  );
}

export default Header;
