import React from 'react';

class Legend extends React.Component {
	constructor(props) {
		super(props);
		this.markers = Object.keys(this.props.markers);
	}

	render() {
		return (
			<div id="legend"> Sort By These:
				<ul id="legendList">
					{this.markers.map((type, key) =>
						<li onClick={() => this.props.sort(type)} key={key}><img src={this.props.markers[type]} /> {type} </li>
					)}
				</ul>
			</div>
		)
	}
}

export default Legend;