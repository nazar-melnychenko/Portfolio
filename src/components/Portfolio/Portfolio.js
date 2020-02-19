import React from 'react';
import './Portfolio.sass';
import axios from 'axios';
import Title from '../Title/Title';
import Footer from '../Footer/Footer'
import { NavLink } from 'react-router-dom';

class Portfolio extends React.Component{
  constructor(props) {
	 super(props);
	 this.state = {
	   data: '',
	 }
  }

  async componentDidMount() {
	 await axios.get("http://localhost:8888/works.php")
	 .then(response => {
		this.setState({
		   data: response.data
		  })
		});
  }

  render() {

    return(
		<div className='portfolioWrapper'>
		  <Title title='Портфоліо' />
		  <div className="portfolioWrapper__contents">
			 <h3>Портфоліо</h3>
			 <div className="content">
				<div className="content__nav">
				  <h4>Категорії:</h4>
				  <ul>
					 <li className="active" data-filter="*">Всі</li>
					 <li data-filter=".lending">Лендінг</li>
					 <li data-filter=".portal">Портали</li>
					 <li data-filter=".im">Інтернет-магазин</li>
					 <li data-filter=".portfolio">Портфоліо</li>
				  </ul>
				</div>
				<div className="content__items">
				  {Object.keys(this.state.data).map((item,i) => (
					 <div key={i} className={this.state.data[item].class + "content__items--item"}>
						<img src={this.state.data[item].img} />
						<div className="hover">
						  <div className="text">
							 <h2>{this.state.data[item].title}</h2>
							 <NavLink to={`/portfolio/${this.state.data[item].id}`}><input type="submit" value='Детально' /></NavLink>
						  </div>
						</div>
					 </div>
				  ))}
				</div>
			 </div>
		  </div>
		  <Footer />
		</div>
	 );
  }
}

export default Portfolio;