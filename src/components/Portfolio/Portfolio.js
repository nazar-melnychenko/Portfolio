import React from 'react';
import './Portfolio.sass';
import Title from '../Title/Title';
import Footer from '../Footer/Footer'
import {NavLink} from 'react-router-dom';
import axios from "axios";

class Portfolio extends React.Component {
  constructor(props) {
	 super(props);
	 this.state = {
		data: '',
		limit: 3,
		btnShow: true,
		isLoad: false,
		isntWork: false
	 };
  }

  componentDidMount() {
	 this.setState({isLoad: true});
	 if (sessionStorage['portfolio']) {
		this.setState({
		  data: JSON.parse(sessionStorage['portfolio']),
		  isLoad: false,
		})
	 } else {
		axios.get(`http://localhost:8888/works.php`)
		  .then(response => {
			 this.setState({
				data: response.data
			 });
		  })
		  .catch(error => {
			 console.log(error)
		  });
		this.setState({
		  isLoad: false,
		});
	 }
  }

  load = () => {
	 this.setState({isLoad: true});
	 let lim = this.state.limit;
	 axios.get(`http://localhost:8888/works.php?limit=${lim}`)
		.then(response => {
		  if (response.data) {
			 this.setState({
				data: this.state.data.concat(response.data),
				limit: this.state.limit + 3
			 });
		  } else {
			 this.setState({
				btnShow: false,
				isntWork: true
			 });
			 sessionStorage['BtnPortfolio'] = false;
			 setTimeout(() => (
				this.setState({isntWork: false})
			 ), 3000);
		  }
		  this.setState({isLoad: false});

		})
		.catch(error => {
		  console.log(error)
		});
  };

  componentWillUnmount() {
	 sessionStorage['portfolio'] = JSON.stringify(this.state.data);
  }

  render() {

	 return (

		<div className='portfolioWrapper'>

		  {this.state.isntWork ? <div className="maseeg">Більше робіт не знайдено</div> : null}
		  <Title title='Портфоліо'/>
		  <div className="portfolioWrapper__contents">
			 <h3>Портфоліо</h3>
			 <div className="content">
				{/*<div className="content__nav">*/}
				{/*<h4>Категорії:</h4>*/}
				{/*<ul>*/}
				{/*<li className="active" data-filter="*">Всі</li>*/}
				{/*<li data-filter=".lending">Лендінг</li>*/}
				{/*<li data-filter=".portal">Портали</li>*/}
				{/*<li data-filter=".im">Інтернет-магазин</li>*/}
				{/*<li data-filter=".portfolio">Портфоліо</li>*/}
				{/*</ul>*/}
				{/*</div>*/}
				<div className="content__items">
				  {Object.keys(this.state.data).map((item, i) => (
					 <div key={i} className="content__items--item">
						<img src={this.state.data[item].img} alt={i}/>
						<div className="hover">
						  <div className="text">
							 <h2>{this.state.data[item].title}</h2>
							 <NavLink className="more" to={`/portfolio/${this.state.data[item].id}`}>Детально</NavLink>
						  </div>
						</div>
					 </div>
				  ))}
				  {this.state.btnShow && !sessionStorage['BtnPortfolio'] ?
					 this.state.isLoad ? <button>Загрузка</button> : <button onClick={this.load}>Загрузити ще</button>
					 : null}
				</div>
			 </div>
		  </div>
		  <Footer/>
		</div>
	 );
  }
}

export default Portfolio;