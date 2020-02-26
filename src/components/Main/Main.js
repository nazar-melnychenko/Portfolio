import React from 'react';
import './Main.sass'
import LightSpeed from 'react-reveal/LightSpeed';

function Main() {
  return(
	 <div className="mainText">
		<div className="mainText__wrapper">
		  <span className="mainText__wrapper--name"><LightSpeed right>NAZAR</LightSpeed></span>
			 <h1><LightSpeed left>FRONT-END DEVELOPER</LightSpeed></h1>
			 <span className="mainText__wrapper--name"><LightSpeed right>MELNYCHENKO</LightSpeed></span>

		</div>
	 </div>
  );
}

export default Main;