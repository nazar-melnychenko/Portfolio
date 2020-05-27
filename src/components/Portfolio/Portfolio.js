import React from 'react';
import './Portfolio.sass';
import Title from '../Title/Title';
import Footer from '../Footer/Footer'
import { NavLink }  from 'react-router-dom';
import axios from "axios";
import _ from "lodash";
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';

class Portfolio extends React.Component {
  constructor(props) {
	 super(props);
	 this.state = {
		dataCopy: '',
		data: '',
		limit: 3,
		btnShow: true,
		isLoad: false,
		isntWork: false,
		isFound: true,
		class: 'all',
	 };
  }

  componentDidMount() {
	 this.setState({isLoad: true});
	 if (sessionStorage['portfolio']) {
		this.setState({
		  dataCopy: JSON.parse(sessionStorage['portfolio']),
		  data: JSON.parse(sessionStorage['portfolio']),
		  limit: JSON.parse(sessionStorage['portfolioLimit']),
		  isLoad: false,
		});
	 } else {
		axios.get(`http://nm-dev.ho.ua/back/works.php`)
		  .then(response => {
		  	console.log(response);
			 this.setState({
				dataCopy: response.data,
				data: response.data,
				isLoad: false,
			 });
		  })
		  .catch(error => {
			 console.log(error)
		  });
	 }

  }

  load = () => {
	 this.setState({
		isLoad: true,
		data: this.state.dataCopy,
		isFound: true,
		class: 'all'
	 });
	 let lim = this.state.limit;
	 axios.get(`http://nm-dev.ho.ua/back/works.php?limit=${lim}`)
		.then(response => {
		  if (response.data) {
			 this.setState({
				dataCopy: this.state.data.concat(response.data),
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

  hendlefilter = (filter) => {
	 this.setState({
		isFound: true,
		class: filter
	 })
    if(filter === 'all'){
		this.setState({
		  data: this.state.dataCopy
		})
	 } else {
		const filtered = _.filter(this.state.dataCopy, friend => friend.filter === filter);
		this.setState({
		  data: filtered,
		});
		if(filtered == ''){
		  this.setState({
			 isFound: false
		  })
		}
	 }

  };

  componentWillUnmount() {
	 sessionStorage['portfolio'] = JSON.stringify(this.state.dataCopy);
	 sessionStorage['portfolioLimit'] = JSON.stringify(this.state.limit);
  }

  render() {
	 return (
		<div className='portfolioWrapper'>
		  {this.state.isntWork ? <Bounce right><div className="maseeg">Більше робіт не знайдено</div></Bounce> : null}
		  <Title title='Портфоліо'/>
		  <div className="portfolioWrapper__contents">
			 <h3>Портфоліо</h3>
			 <div className="content">
				<div className="content__nav">
				  <h4>Категорії:</h4>
				  <ul>
				  <li className={this.state.class === 'all'? 'active':''} onClick={() => this.hendlefilter('all')}>Всі</li>
				  <li className={this.state.class === 'lending'? 'active':''} onClick={() => this.hendlefilter('lending')}>Лендінг</li>
				  <li className={this.state.class === 'wp'? 'active':''} onClick={() => this.hendlefilter('wp')}>WordPress</li>
				  <li className={this.state.class === 'react'? 'active':''} onClick={() => this.hendlefilter('react')}>React</li>
				  </ul>
				</div>
				<Zoom left>
				<div className="content__items">
				  {this.state.isFound ?
					 (Object.keys(this.state.data).map((item, i) => (
					 <div key={i} className="content__items--item">
						<img src={this.state.data[item].img} alt={this.state.data[item].title}/>
						<div className="hover">
						  <div className="text">
							 <h2>{this.state.data[item].title}</h2>
							 <NavLink className="more" to={`/portfolio/${this.state.data[item].id}`}>Детально</NavLink>
						  </div>
						</div>
					 </div>
				  )))
				  : <p className="workNotFound">На даний момент не всі роботи загружені, натисніть кнопку "Загрузити ще..."</p> }
				  {this.state.btnShow && !sessionStorage['BtnPortfolio'] ?
					 this.state.isLoad ? <img className="load" src="img/load.png" alt="Загрузка"/> : <div className="BtnLoad" onClick={this.load}>Загрузити ще...</div>
					 : null}
				</div>
				</Zoom>
			 </div>
		  </div>
		  <Footer/>
		</div>
	 );
  }
}

export default Portfolio;