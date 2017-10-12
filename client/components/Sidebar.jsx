import React from 'react';
import Entry from './Entry.jsx';
import { Button, Item } from 'semantic-ui-react';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="sidebar">
				<Button circular icon='close' floated='right' onClick={() => this.props.hideEvents()}/>
				<Item.Group divided style={{clear:'both'}}/>
					{this.props.events.map((event, key) =>
						<Entry event={event} key={key} favVenue={this.props.favVenue}/>
					)}
				<Item.Group/>
		  </div>
		)
	}
}

export default Sidebar;
