import React from 'react';

class Legend extends React.Component {
	constructor(props) {
		super(props);
		this.markers = Object.keys(this.props.markers);
		console.log('MARKERS:', this.markers);
	}

	render() {
		return (
			<div id="legend">
				<ul id="legendList">
					{this.markers.map((type, key) =>
						<li key={key}><img src={this.props.markers[type]} /> {type} </li>
					)}
				</ul>
			</div>
		)
	}
}

export default Legend;