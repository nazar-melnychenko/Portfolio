import React from 'react';
import './ViewWork.sass'

class ViewWork extends React.Component{
  // constructor(props) {
	//  super(props);
  // }

  render() {
	 const id= this.props.match.params.id;

    return(
      <h1>{id}</h1>
	 );
  }
}

export default ViewWork;
