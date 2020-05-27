import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
	 center: {
		lat: 59.95,
		lng: 30.33
	 },
	 zoom: 11
  };

  render() {
	 return (
		// Important! Always set the container height explicitly
		<div style={{ height: '300px', width: '100%', boxShadow: "0 0 10px #fff", color: "black"}}>
		  <GoogleMapReact
			 bootstrapURLKeys={{ key: 'AIzaSyCDCApeoMpSTQxvz14Yhh09zlsw8FhB2ck&libraries' }}
			 defaultCenter={{lat:48.921500,lng:24.7097200}}
			 defaultZoom={14}
		  >
			  <Marker
				  lat={48.921500}
				  lng={24.7097200}
				  color="#02a8f4"
			  />
		  </GoogleMapReact>
		</div>
	 );
  }
}

export default SimpleMap;