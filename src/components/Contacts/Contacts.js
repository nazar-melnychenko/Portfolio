import React from 'react';
import './Contacts.sass';
import axios from 'axios';
import Title from '../Title/Title';
import Footer from '../Footer/Footer'

class Contacts extends React.Component{

  constructor(props) {
	 super(props);
	 this.state = {
		data:{
		  name: '',
		  tel: '',
		  email: '',
		  subject: '',
		  text: '',
		},
		errors:{
		  name: '',
		  email: '',
		  text: '',
		},
		general: '',
	 }
  }

  handleInputChange = (e) => {
	 this.setState({state: this.state.errors.name = ''});
	 this.setState({state: this.state.errors.email = ''});
	 this.setState({state: this.state.errors.text = ''});
	 this.setState({state: this.state.errors.name = ''});
	 this.setState({state: this.state.general = ''});
	 const name = e.target.name;
	 this.setState({state:
		this.state.data[name] = e.target.value
	 });
  };

  handleSubmit = (e) => {
	 if (!this.state.data.name){
		this.setState({state: this.state.errors.name = 'Введіть ім\'я'});
	 }else if (!this.state.data.email || this.state.data.email.indexOf('@') < 0) {
		this.setState({state: this.state.errors.email = 'Введіть коректну електронну пошту'});
	 }else if (!this.state.data.text) {
		this.setState({state: this.state.errors.text = 'Введіть повідомлення'});
	 }else{
	 axios.post('http://localhost:8888/massege.php',
		  JSON.stringify(this.state.data)
		)
		  .then((response) => {
			 if (response.data) {
				this.setState({state: this.state.general = 'Ваше повідомлення відправлене'})
			 } else {
				this.setState({state: this.state.general = 'Ваше повідомлення не відправлене'})
			 }
		  })
		  .catch(function (error) {
			 console.log(error);
		  });

	 this.setState({state: this.state.data.name = ''});
	 this.setState({state: this.state.data.tel = ''});
	 this.setState({state: this.state.data.email = ''});
	 this.setState({state: this.state.data.subject = ''});
	 this.setState({state: this.state.data.text = ''});

	 setTimeout(() =>(
		this.setState({general:''})
	 ),3000);
	 }
	 e.preventDefault();
  };

  render() {
    return(
		<div className="contactsWrapper">
		  <Title title='Контакти' />
		  <div className="contactsWrapper__content">
			 <h3>Контакти</h3>
			 <div className="formWrapper">
				<div className="formWrapper__form">
				  {this.state.general ? <div className="maseeg">{this.state.general}</div> : null}
				  <form>
					 <input
						type="text"
						name="name"
						placeholder="Ім'я *"
						value={this.state.data.name}
						onChange={this.handleInputChange}
					 /><br />
					 <span>{this.state.errors.name ? this.state.errors.name : null}</span><br />
					 <input
						type="text"
						name="tel"
						placeholder="+380(__) __ __ ___"
						value={this.state.data.tel}
						onChange={this.handleInputChange}
					 /><br />
					 <span>{this.state.errors.tel ? this.state.errors.tel : null}</span><br />
					 <input
						type="email"
						name="email"
						placeholder="Пошта *"
						value={this.state.data.email}
						onChange={this.handleInputChange}
					 /><br />
					 <span>{this.state.errors.email ? this.state.errors.email : null}</span><br />
					 <input
						type="text"
						name="subject"
						placeholder="Тема"
						value={this.state.data.subject}
						onChange={this.handleInputChange}
					 /><br />
					 <textarea
						name="text"
						placeholder="Текст *"
						rows={7}
						value={this.state.data.text}
						onChange={this.handleInputChange}>
					 </textarea><br />
					 <span>{this.state.errors.text ? this.state.errors.text : null}</span><br />
					 <input type="submit" onClick={this.handleSubmit} value='Відправити' />
				  </form>
				</div>
				<div className="formWrapper__contacts">
				  2
				</div>
			 </div>
		  </div>
		  <Footer />
		</div>
	 );
  }
}

export default Contacts;