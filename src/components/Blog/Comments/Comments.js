import React from 'react';
import './Comments.sass'
import axios from 'axios';
import _ from "lodash";

class Comments extends React.Component {
  constructor(props) {
	 super(props);
	 this.state = {
		data: '',
		comments:{
		  name: '',
		  text: '',
		  commentKey: ''
		},
		errors:{
		  name: '',
		  text: '',
		},

	 };

  }

  generateString =(length = 10) =>{
	 let str = '';
	 let range = (start, end) => [...Array(end - start).keys(), end - start].map(n => start + n);
	 let A = range(65, 90);   // A-Z
	 let a = range(97, 122);  // a-z
	 let dig = range(48, 57); // 0-9
	 let all = A.concat(a).concat(dig);

	 for(let i = 0; i < length; i++){
		str += String.fromCharCode(all[Math.floor(Math.random() * all.length)]);
	 }

	 return str;
  };

  componentDidMount() {
	 if(!localStorage['commentKey']){
		localStorage['commentKey'] = this.generateString(21);
	 }
	 axios.get(`http://localhost:8888/comments.php?id=${this.props.id}`)
		.then(response => {
		  this.setState({
			 data: response.data
		  });
		})
		.catch(error => {
		  console.log(error)
		});
  }

  handleInputChange = (e) =>  {
	 this.setState(prevState =>({
		errors:{
		  ...prevState.errors,
		  name: '',
		  text: '',
		}
	 }));

	 const value = e.target.value;
	 const name = e.target.name;
	 this.setState(prevState =>({
		comments:{
		  ...prevState.comments,
		[name]: value
	 }
	 }));
  };

  handleSubmit = (id,e) => {
    const key = localStorage['commentKey'];
	 if (!this.state.comments.name){
	   console.log(this.state.comments);
		this.setState({state: this.state.errors.name = 'Введіть ім\'я'});
	 }else if (!this.state.comments.text) {
		this.setState({state: this.state.errors.text = 'Введіть коментар'});
	 }else{
		this.setState({state: this.state.comments.commentKey = key});
		axios.post(`http://localhost:8888/comments.php?blogId=${id}`,
		  JSON.stringify(this.state.comments)
			)
		  .then((response) => {
				console.log(response.data)
		  })
		//   .catch(function (error) {
		// 	 console.log(error);
		//   });
		//
		// this.setState(prevState =>({
		//   comments:{
		// 	 ...prevState.comments,
		// 	 name: '',
		// 	 text: '',
		//   }
		// }));
		console.log(this.state.comments);
	 }
	 e.preventDefault();
  };

  delete = (id) => {
	 axios.delete(`http://localhost:8888/comments.php?id=${id}`)
		.then(response => {
		  if (response) {
			 _.remove(this.state.data, friend => friend.id === id);
			 this.setState({
				data: this.state.data
			 })
		  }
		})
		.catch(error => {
		  console.log(error)
		});
  };

  render() {
	 return (
		<div className="comments">
		  <h3>Коментарі</h3>
		  <form method="POST">
			 <input
				type="text"
				name="name"
				placeholder="Ім'я *"
				value={this.state.value}
				onChange={this.handleInputChange}
			 /><br />
			 <span>{this.state.errors.name ? this.state.errors.name : null}</span>
			 <textarea
				rows="7"
				name="text"
				placeholder="Коментар *"
				value={this.state.value}
				onChange={this.handleInputChange}
			 /><br />
			 <span>{this.state.errors.text ? this.state.errors.text : null}</span>
			 <input type="submit" onClick={(e) => this.handleSubmit(this.props.id,e)} value='Відправити' />
		  </form>
		  <hr />
		  {this.state.data != '' ?
			 Object.keys(this.state.data).map((item, i) => (
				<div key={i} className="content__items--item">
				  <div>{this.state.data[item].name}</div>
				  <div>{this.state.data[item].text}</div>
				  <div>{this.state.data[item].date}</div>
				  <br/>
				  <span
					 onClick={() => this.delete(this.state.data[item].id)}>X - {this.state.data[item].id}</span><br/><br/><br/><br/>
				</div>
			 ))
			 :
			 <div>Будьте першими хто залишить коментар :)</div>
		  }
		</div>
	 );
  }
}

export default Comments;