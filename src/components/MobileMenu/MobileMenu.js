import React from 'react';
import '../Nav/fonts/all.css'
import './MobileMenu.sass';
import {NavLink} from "react-router-dom";

class MobileMenu extends React.Component{
  constructor(props) {
	 super(props);
	 this.state = {
	   isOpen: false,
	 }
  }

  hendleOpen = () => {
    if(this.state.isOpen){
		this.setState({isOpen: false})
	 }else {
		this.setState({isOpen: true})
	 }
  };

  hendleClose = () => {
	 this.setState({
		isOpen: false
	 })
  };

  render() {
    return(
		<div className="navMobile">
		  <div onClick={this.hendleOpen} className={this.state.isOpen ? 'hamb hamb__active' : 'hamb'}><span></span></div>
		  <div className={this.state.isOpen ? 'overlay overlay__active' : 'overlay'}>
			 <ul>
				<li onClick={this.hendleClose}><NavLink exact to="/" activeClassName="navActive">Головна</NavLink></li>
				<li onClick={this.hendleClose}><NavLink  to="/about" activeClassName="navActive">Про мене</NavLink></li>
				<li onClick={this.hendleClose}><NavLink  to="/portfolio" activeClassName="navActive">Портфоліо</NavLink></li>
				{/*<li onClick={this.hendleClose}><NavLink  to="/blog" activeClassName="navActive">Блог</NavLink></li>*/}
				<li onClick={this.hendleClose}><NavLink  to="/contacts" activeClassName="navActive">Контакти</NavLink></li>
			 </ul>
			 <div className="social">
				<a href="https://www.facebook.com/profile.php?id=100001670069079" target="_blank"><i className="fab fa-facebook-f"></i></a>
				<a href="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
				<a href="https://www.instagram.com/nazar_melnychenko/?hl=uk" target="_blank"><i className="fab fa-instagram"></i></a>
			 </div>
		  </div>
		</div>
	 );
  }
}

export default MobileMenu;