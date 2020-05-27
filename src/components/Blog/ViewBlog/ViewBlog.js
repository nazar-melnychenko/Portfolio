import React from 'react';
import './ViewBlog.sass'
import axios from 'axios';
import Footer from '../../Footer/Footer';
import Comments from '../Comments/Comments'

class ViewBlog extends React.Component{
  constructor(props) {
	 super(props);
	 this.state = {
		data: '',
	 }
  }

  componentDidMount() {
	 axios.get(`http://nm-dev.ho.ua/back/blog.php?id=${this.props.match.params.id}`)
		.then(response => {
		  this.setState({
			 data: response.data
		  })
		});
  }

  render() {
    return(
		<>
		  <div className="viewWrapperBlog">
			 {Object.keys(this.state.data).map((item,i) => (
				<div key={i} className="viewWrapperBlog__item">
				  <h3>{this.state.data[item].title}</h3>
				  <div className="viewWrapperBlog__item--img">
					 <img src={this.state.data[item].img} />
				  </div>
				  <p>{this.state.data[item].description_full}</p>
				  <hr />
				  <p className="viewWrapperBlog__item--data">Дата публікації: {this.state.data[item].date}</p>
					<div className="clearfix"></div>

				</div>
			 ))}
			 <Comments id={this.props.match.params.id}/>
		  </div>
		  <Footer />
		</>
	 );
  }
}

export default ViewBlog;
