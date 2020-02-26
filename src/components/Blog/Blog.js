import React from 'react';
import './Blog.sass';
import Title from '../Title/Title';
import Footer from '../Footer/Footer'
import {NavLink} from "react-router-dom";
import axios from "axios";
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';


class Blog extends React.Component{
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
	 if (sessionStorage['blog']) {
		this.setState({
		  data: JSON.parse(sessionStorage['blog']),
		  limit: JSON.parse(sessionStorage['blogLimit']),
		  isLoad: false,
		})
	 } else {
		axios.get(`http://localhost:8888/blog.php`)
		  .then(response => {
			 this.setState({
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
	 this.setState({isLoad: true});
	 let lim = this.state.limit;
	 axios.get(`http://localhost:8888/blog.php?limit=${lim}`)
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
			 sessionStorage['BtnBlog'] = false;
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
	 sessionStorage['blog'] = JSON.stringify(this.state.data);
	 sessionStorage['blogLimit'] = JSON.stringify(this.state.limit);
  }

  render() {
    return(
		<div className='blogWrapper'>
		  <Title title='Блог' />
		  <div className="blogWrapper__content">
			 	{this.state.isntWork ? <Bounce right><div className="maseeg">Більше записів не знайдено</div></Bounce> : null}
			 <h3>Блог</h3>
			 <div className="content">
				<div className="content__items">
				  {Object.keys(this.state.data).map((item, i) => (
				    <>
					 <Fade bottom>
					 <div key={i} className="content__items--item">
						<div className="img">
						  <img src={this.state.data[item].img} alt={i}/>
						</div>
						<div className={i % 2 ? 'wrapperItems' : 'wrapperItems right'}>
						  <h4>{this.state.data[item].title}</h4>
						  <p className="wrapperItems__description">{this.state.data[item].description}<NavLink to={`/blog/${this.state.data[item].id}`}>&ensp;&ensp;Читати далі...</NavLink></p>
						  <p className="wrapperItems__data">Дата публікації: {this.state.data[item].date}</p>
						</div>
					 </div>
					 </Fade>
					</>
				  ))}

				  {this.state.btnShow && !sessionStorage['BtnBlog'] ?
					 this.state.isLoad ? <img className="load" src="img/load.png" alt="Загрузка"/> : <div className="BtnLoad" onClick={this.load}>Загрузити ще...</div>
					 : null}
				</div>
			 </div>
		  </div>
		  <Footer />
		</div>
	 );
  }
}

export default Blog;