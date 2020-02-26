import React from 'react';
import './Title.sass';
import Flip from 'react-reveal/Flip';

class Title extends React.Component{
  handleScroll = (e) => {
	 let headerDesc= document.querySelector('.mainTitle');
	 let opacity =(100/(e.currentTarget.scrollY))/10;
	 if (headerDesc){
		headerDesc.setAttribute("style", `top:${200 + e.currentTarget.scrollY*2}px; opacity:${opacity};`);
		if (e.currentTarget.scrollY === 0) {
		  headerDesc.setAttribute("style", `top:${200}px; opacity:${1};`);
		}
	 }
  };
  render() {
	 window.addEventListener('scroll', this.handleScroll);
    return(

			<h2 className="mainTitle"><Flip>{this.props.title}</Flip></h2>

	 );
  }
}

export default Title;