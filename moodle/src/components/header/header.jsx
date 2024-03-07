import React, { useState } from 'react';
import './header.css';
import img from './chel.svg';
import logo from './iconn.png';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
  
  const [isDropdownOpen1, setDropdownOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setDropdownOpen1(!isDropdownOpen1);
  };

  const closeDropdown1 = () => {
    setDropdownOpen1(false);
  };

  return (
    <div className='header'>
      <div className="container">
        <div className="header-chart">
          <div className="header-inner">
            <NavLink to="/" className="logo">
              <img src={logo} alt="" />
            </NavLink>
            <a href="#!" className="nav__link1"></a>
            <nav className="navbar">
              <div
                className="nav__link"
                onClick={toggleDropdown1}
                onMouseLeave={closeDropdown1}
              >
                МЕНЮ
                {isDropdownOpen1 && (
                  <div className="dropdown-menu">
                    {props.auth.data.type === "Student" ? (
                      <>
                        <NavLink to="/grades">Оценки</NavLink>
                        <NavLink to='/journal'>Журнал</NavLink>
                        <NavLink to='/course'>Курсы</NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink to='/groups'>Ваши группы</NavLink>
                      </>
                    )}
                  </div>
                )}
              </div>
              <NavLink to="/clubs" id='line-1' className="nav__link">
                КЛУБЫ
              </NavLink>
              <NavLink to='/rating' id='line-2' className="nav__link3">
                ОЦЕНИВАНИЕ
              </NavLink>
            </nav>
          </div>
          <div className="header-inner2">
            <nav className='navbar2'>
              {props.auth.userData.length === 0 ? (
                <>
                  <NavLink id='line-2' to="/login" className='nav__link2'>
                    ВХОД 
                  </NavLink>
                  <div className="line">|</div>
                  <NavLink id='line-2' to="/register" className='nav__link2'>
                    РЕГИСТРАЦИЯ
                  </NavLink>
                </>
              ) : (
                <NavLink
                  id='line-2'
                  to="/profile"
                  className='nav__link4'
                >
                  {props.auth.data.first_name} {props.auth.data.last_name}
                </NavLink>
              )}
              <NavLink to="/profile" className='nav__link4'>
                <img src={img} alt="" />
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
