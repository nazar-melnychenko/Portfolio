import React from 'react';
import './Nav.sass';
import './fonts/all.css';
import Social from '../Social/Social'
import { NavLink } from 'react-router-dom';

function Nav() {
  return(
	 <>
		<ul>
		  <li><NavLink exact to="/" activeClassName="navActive">Головна</NavLink></li>
		  <li><NavLink  to="/about" activeClassName="navActive">Про мене</NavLink></li>
		  <li><NavLink  to="/portfolio" activeClassName="navActive">Портфоліо</NavLink></li>
		  <li><NavLink  to="/blog" activeClassName="navActive">Блог</NavLink></li>
		  <li><NavLink  to="/contacts" activeClassName="navActive">Контакти</NavLink></li>
		</ul>
		<Social />
	 </>
  );
}

export default Nav;