import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ResultUserVo } from '../../types/result-user-vo';
import { Dropdown, MenuProps, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { reLogin, userLogOut } from './api';
import { AuthContext } from '../../AuthContext';
import { ResultVo } from '../../types/result';

const items: MenuProps['items'] = [
  {
    label: 'Profile',
    key: 'profile',
  },
  {
    label: 'Log Out',
    key: 'logout',
  }
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, setLogin } = useContext(AuthContext)

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key === 'logout') {
      const response = await userLogOut();
      const result: ResultVo = await response.json();
      if (result.code === 1) {
        message.success('Successfully logged out')
        setLogin(false);
        if (location.pathname === '/profile') {
          navigate('/');
        }
      } else {
        message.error('Log out failed');
      }
    } else if (e.key === 'profile') {
      navigate('/profile');
    }

  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Comixo<span>.</span>
        </Link>

        <div className="d-flex d-lg-none align-items-center">
          {isLogin ? (
            <Dropdown menu={menuProps}>
              <a className="button-secondary me-2">
                <UserOutlined />
              </a>
            </Dropdown>
          ) : (
            <a data-bs-toggle="modal"
              data-bs-target="#contact-modal"
              href="#"
              className="button-secondary me-2">
              Login
            </a>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mt-0 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#new-comics">
                Comics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/book-upload">
                Upload
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#blog">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="modal"
                data-bs-target="#contact-modal"
                href="#"
              >
                Contact
              </a>
            </li>*/}
          </ul>
          <div className="menu-action d-flex">
            {/* <div className="action-icon">
              <a href="bookmark.html" className="menu-icon">
                <i className="fa-solid fa-bookmark"></i>
              </a>
              <a href="cart.html" className="menu-icon">
                <span>2</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </a>
              <a
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                className="menu-icon mobile-v-show"
                href="#"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </div>*/}
            {isLogin ? (
              <Dropdown menu={menuProps}
              >
                <a
                  className="button-secondary"
                >
                  <UserOutlined />
                </a>
              </Dropdown>
            ) : (
              <a data-bs-toggle="modal"
                data-bs-target="#contact-modal"
                href="#" className="button-secondary">
                Login
              </a>
            )}
            <a
              href="#"
              className="ham-button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <div className="hamburger-menu">
                <div className="nav-line"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
