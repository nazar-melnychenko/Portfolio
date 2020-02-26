import React from 'react';
import './Contacts.sass';
import axios from 'axios';
import Title from '../Title/Title';
import Social from '../Social/Social';
import Footer from '../Footer/Footer';
import SimpleMap from './GoogleMap/GoogleMap';
import Bounce from 'react-reveal/Bounce';

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
	 this.setState(prevState =>({
		errors:{
		  ...prevState.errors,
		  name: '',
		  email: '',
		  text: '',
		},
		general: ''
	 }));

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

	 this.setState(prevState =>({
		data:{
		  ...prevState.data,
		  name: '',
		  tel: '',
		  email: '',
		  subject: '',
		  text: '',
		}
	 }));


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
				<Bounce left>
					<div className="formWrapper__form">
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
				</Bounce>
				<Bounce right>
					<div className="formWrapper__contacts">
				  <p>Зв'яжіться зі мною будь-яким зручним для Вас способом</p>
				  <hr />
				  <span>
					 Телефон:<br />
					 <a href="tel:+380957511806">+380 (95) 751 18 06</a><br />
					 <i>( Viber, Telegram, Whatsapp )</i>
				  </span><br />
				  <span>
					 E-mail:<br />
					 <a href="mailto:nazar.melnychenko@gmail.com">nazar.melnychenko@gmail.com</a>
				  </span>
				  <br />
				  <span>
					 Skype:<br />
					 <a href="skype:skay.net?call">skay.net</a>
				  </span>
				  <hr />
				  <Social />
				</div>
				</Bounce>
			 </div>
		  </div>
		  <SimpleMap />
		  {this.state.general ? <Bounce right><div className="maseeg">{this.state.general}</div></Bounce> : null}
		  <Footer />
		</div>
	 );
  }
}

export default Contacts;