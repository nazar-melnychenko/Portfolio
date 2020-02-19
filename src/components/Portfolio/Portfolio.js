import React, { useEffect, useRef, useState }from 'react';
import Isotope from 'isotope-layout'
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
		limit: 3,
		btnShow: true,
		isLoad: false,
		isntWork: false
	 }
	 const IsotopeReact = () => {
		// store the isotope object in one state
		const [isotope, setIsotope] = React.useState(null);
		// store the filter keyword in another state
		const [filterKey, setFilterKey] = React.useState("*");

		// initialize an Isotope object with configs
		React.useEffect(() => {
		  setIsotope(
			 new Isotope(".filter-container", {
				itemSelector: ".filter-item",
				layoutMode: "fitRows"
			 })
		  );
		}, []);

		// handling filter key change
		React.useEffect(
		  () => {
			 if (isotope) {
				filterKey === "*"
				  ? isotope.arrange({ filter: `*` })
				  : isotope.arrange({ filter: `.${filterKey}` });
			 }
		  },
		  [isotope, filterKey]
		);

		//  return (
		// 	<>
		// 	  <ul>
		// 		 <li onClick={() => setFilterKey("*")}>Show Both</li>
		// 		 <li onClick={() => setFilterKey("vege")}>Show Veges</li>
		// 		 <li onClick={() => setFilterKey("fruit")}>Show Fruits</li>
		// 	  </ul>
		// 	  <hr />
		// 	  <ul className="filter-container">
		// 		 <div className="filter-item vege">
		// 			<span>Cucumber</span>
		// 		 </div>
		// 		 <div className="filter-item fruit">
		// 			<span>Apple</span>
		// 		 </div>
		// 		 <div className="filter-item fruit">
		// 			<span>Orange</span>
		// 		 </div>
		// 		 <div className="filter-item fruit vege">
		// 			<span>Tomato</span>
		// 		 </div>
		// 	  </ul>
		// 	</>
		//  );
	 };
  }
  async componentDidMount() {
	 this.setState({isLoad: true});
	 await axios.get("http://localhost:8888/works.php")
	 .then(response => {
		this.setState({
		   data: response.data
		  });
		console.log(response);
		});
	 this.setState({isLoad: false});
  }
  load = () => {
	 this.setState({isLoad: true});
    let lim = this.state.limit;
	 axios.get(`http://localhost:8888/works.php?limit=${lim}`)
		.then(response => {
		  if(response.data){
			 this.setState({
				data: this.state.data.concat(response.data),
				limit: this.state.limit + 3
			 });
		  } else {
		    this.setState({
				btnShow: false,
				isntWork: true
		    });
			 setTimeout(() =>(
				this.setState({isntWork: false})
			 ),3000);
		  }
		  this.setState({isLoad: false});

		})
		.catch(error => {
			 console.log(error)
		  });

  };



  render() {

    return(
		<div className='portfolioWrapper'>
		  {this.state.isntWork ? <div className="maseeg">Більше робіт не знайдено</div> : null}
		  <Title title='Портфоліо' />
		  <div className="portfolioWrapper__contents">
			 <h3>Портфоліо</h3>
			 <div className="content">
				<div className="content__nav">
				  <h4>Категорії:</h4>
				  <ul>
					 <li className="active" onClick={() => this.setFilterKey("*")}>Всі</li>
					 <li onClick={() => this.setFilterKey("lending")}>Лендінг</li>
					 <li onClick={() => this.setFilterKey("portal")}>Портали</li>
					 <li onClick={() => this.setFilterKey("im")}>Інтернет-магазин</li>
					 <li onClick={() => this.setFilterKey("portfolio")}>Портфоліо</li>
				  </ul>
				</div>
				<div className="content__items filter-container">
				  {Object.keys(this.state.data).map((item,i) => (
					 <div key={i} className={this.state.data[item].class + " filter-item content__items--item"}>
						<img src={this.state.data[item].img} alt={i}/>
						<div className="hover">
						  <div className="text">
							 <h2>{this.state.data[item].title}</h2>
							 <NavLink to={`/portfolio/${this.state.data[item].id}`}><input type="submit" value='Детально ' />{this.state.data[item].id}</NavLink>
						  </div>
						</div>
					 </div>
				  ))}
				  {this.state.btnShow ?
						this.state.isLoad ? <button>Загрузка</button> : <button onClick={this.load}>Загрузити ще</button>
					 : null}
				</div>
			 </div>
		  </div>
		  <Footer />
		</div>
	 );
  }
}

export default Portfolio;