import React from 'react';
import axios from 'axios';


class Api extends React.Component{
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

  async componentDidMount() {
	 this.setState({isLoad: true});
	 let count;
	 if(sessionStorage['countPortfolio']){
		count = +sessionStorage['countPortfolio'];
	 }else {
		count = 3;
	 }
	 await axios.get(`http://localhost:8888/works.php?count=${count}`)
		.then(response => {
		  this.setState({
			 data: response.data
		  });
		})
		.catch(error => {
		  console.log(error)
		});
	 if (count < 3){
		count = 3;
	 }
	 this.setState({
		isLoad: false,
		limit: count
	 });
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
			 sessionStorage['countPortfolio'] = this.state.limit;
		  } else {
			 this.setState({
				btnShow: false,
				isntWork: true
			 });
			 sessionStorage['BtnPortfolio'] = false;
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

}


export default Api;