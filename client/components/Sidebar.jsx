import React from 'react';
import Entry from './Entry.jsx';
import { Button } from 'semantic-ui-react';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="sidebar">
				<Button secondary onClick={() => this.props.hideEvents()}>Hide Events</Button>
				{this.props.events.map((event, key) => 
					<Entry event={event} key={key} />
				)} 
		  </div>
		)
	}
}

export default Sidebar;