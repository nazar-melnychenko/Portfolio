import React from 'react';
import './ViewBlog.sass'
import axios from 'axios';
import Footer from '../../Footer/Footer'

class ViewBlog extends React.Component{
  constructor(props) {
	 super(props);
	 this.state = {
		data: '',
	 }
  }


  async componentDidMount() {
	 const id= this.props.match.params.id;
	 await axios.get(`http://localhost:8888/blog.php?id=${id}`)
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
				  <p>{this.state.data[item].date}</p>
					<div className="clearfix"></div>
				</div>
			 ))}

		  </div>
		  <Footer />
		</>
	 );
  }
}

export default ViewBlog;
