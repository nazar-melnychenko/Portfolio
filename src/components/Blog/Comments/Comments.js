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
	 axios.get(`http://nm-dev.ho.ua/back/comments.php?id=${this.props.id}`)
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
		this.setState({state: this.state.errors.name = 'Введіть ім\'я'});
	 }else if (!this.state.comments.text) {
		this.setState({state: this.state.errors.text = 'Введіть коментар'});
	 }else{
		this.setState({state: this.state.comments.commentKey = key});
		 axios.post(`http://nm-dev.ho.ua/back/comments.php?id=${id}`,
		   JSON.stringify(this.state.comments)
			)
		  .then((response) => {
				if(response){
					 axios.get(`http://nm-dev.ho.ua/back/comments.php?id=${this.props.id}`)
						.then(response => {
						  console.log(response)
						  this.setState({
							 data: response.data
						  })})
				}
		  })
		  .catch(function (error) {
			 console.log(error);
		  });

	 	}
	 this.setState(prevState =>({
		comments:{
		  ...prevState.comments,
		  name: '',
		  text: '',
		}
	 }));
	 e.preventDefault();
  };

  delete = (id) => {
	 axios.delete(`http://nm-dev.ho.ua/back/comments.php?id=${id}`)
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
				value={this.state.comments.name}
				onChange={this.handleInputChange}
			 /><br />
			 <span>{this.state.errors.name ? this.state.errors.name : null}</span><br />
			 <textarea
				rows="7"
				name="text"
				placeholder="Коментар *"
				value={this.state.comments.text}
				onChange={this.handleInputChange}
			 /><br />
			 <span>{this.state.errors.text ? this.state.errors.text : null}</span><br />
			 <input type="submit" onClick={(e) => this.handleSubmit(this.props.id,e)} value='Відправити' />
		  </form>
		  {this.state.data != '' ?
			 Object.keys(this.state.data).map((item, i) => (
				<div key={i} className="comments__items">
				  <hr />
				  <span className="comments__items--name">{this.state.data[item].name}</span>
				  <span className="comments__items--date">{this.state.data[item].date}</span>
				  {this.state.data[item].key_user == localStorage['commentKey'] ? <span className="comments__items--delete" onClick={() => this.delete(this.state.data[item].id)}>[ Видалити ]</span> : null}
				  <div className="comments__items--text">{this.state.data[item].text}</div>
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