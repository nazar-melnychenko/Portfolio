import React from 'react';
import './Nav.sass'
import './fonts/all.css'
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
		<div className="social">
		  <a href="https://www.facebook.com/profile.php?id=100001670069079" target="_blank"><i className="fab fa-facebook-f"></i></a>
		  <a href="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
		  <a href="https://www.instagram.com/nazar_melnychenko/?hl=uk" target="_blank"><i className="fab fa-instagram"></i></a>
		</div>
	 </>
  );
}

export default Nav;