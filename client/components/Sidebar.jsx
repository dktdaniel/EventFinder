import React from 'react';
import Entry from './Entry.jsx';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="sidebar">
				<Entry />
				<Entry />
				<Entry />  
		  </div>
		)
	}
}

export default Sidebar;