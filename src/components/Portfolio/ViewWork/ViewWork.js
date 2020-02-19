import React from 'react';
import './ViewWork.sass'
import axios from 'axios';
import Footer from '../../Footer/Footer'

class ViewWork extends React.Component{
  constructor(props) {
	 super(props);
	 this.state = {
		data: '',
	 }
  }


  async componentDidMount() {
	 const id= this.props.match.params.id;
	 await axios.get(`http://localhost:8888/works.php?id=${id}`)
		.then(response => {
		  this.setState({
			 data: response.data
		  })
		});
  }

  render() {


    return(
		<>
		  <div className="viewWrapper">
			 {Object.keys(this.state.data).map((item,i) => (
				<div key={i} className="viewWrapper__item">
				  <h3>{this.state.data[item].title}</h3>
				  <div className="viewWrapper__item--img">
					 <img src={this.state.data[item].img_full} />
				  </div>
				  <p>{this.state.data[item].description}</p>
				  <p>{this.state.data[item].technology}</p>
				  <p>{this.state.data[item].date}</p>
				  <a href="https://www.google.com.ua" target="_blank">Перейти на сайт</a>
					<div className="clearfix"></div>
				</div>
			 ))}

		  </div>
		  <Footer />
		</>
	 );
  }
}

export default ViewWork;
