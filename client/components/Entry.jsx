import React from 'react';
import { Image, Item } from 'semantic-ui-react';

class Entry extends React.Component {
	constructor(props) {
		super(props);
		console.log('PROPS:', this);
	}

	render() {
		return (
			<Item>
	      <Item.Content>
	        <Item.Header>{this.props.event.event.name}</Item.Header>
	        <Item.Meta>{this.props.event.event.startDate}</Item.Meta>
	        <Item.Meta>{this.props.event.event.startTime}</Item.Meta>
	        <Item.Description>
	          <Image src={this.props.event.event.image} />
	        </Item.Description>
	        <Item.Extra><a href={this.props.event.event.url} target="_blank">Event Details</a></Item.Extra>
	      </Item.Content>
	    </Item>
    )
	}
}

export default Entry;