import React from 'react';
import './App.sass';
import {Route, Switch} from 'react-router-dom';

import Nav from '../Nav/Nav';
import MobileMenu from '../MobileMenu/MobileMenu'
import Main from '../Main/Main';
import About from '../About/About';
import Portfolio from '../Portfolio/Portfolio';
// import Blog from '../Blog/Blog';
import Contacts from '../Contacts/Contacts';
import ViewWork from "../Portfolio/ViewWork/ViewWork";
import ViewBlog from '../Blog/ViewBlog/ViewBlog'
import NoMatchPage from '../NoMatchPage/NoMatchPage'

class App extends React.Component {
  constructor(props) {
	 super(props)

  }

  render() {
	 return (
		<div className='wrapper'>
		  <nav className="mobile">
			 <MobileMenu/>
		  </nav>
		  <nav className='nav'>
			 <Nav/>
		  </nav>
		  <main className='main'>
			 <Switch>
				<Route exact path='/' component={Main}/>
				<Route exact path='/about/' component={About}/>
				<Route exact path='/portfolio/' component={Portfolio}/>
				<Route exact path="/portfolio/:id" component={ViewWork}/>
				{/*<Route exact path='/blog/' component={Blog}/>*/}
				{/*<Route exact path='/blog/:id' component={ViewBlog}/>*/}
				<Route exact path='/contacts/' component={Contacts}/>
				<Route path='*' component={NoMatchPage}/>
			 </Switch>
		  </main>
		</div>
	 );
  }
}

export default App;
