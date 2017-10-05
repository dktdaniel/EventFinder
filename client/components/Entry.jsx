import React from 'react';
import { Image, Item } from 'semantic-ui-react';

class Entry extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Item>
	      <Item.Image size='tiny' src='/assets/images/wireframe/image.png' />
	      <Item.Content>
	        <Item.Header as='a'>Header</Item.Header>
	        <Item.Meta>Description</Item.Meta>
	        <Item.Description>
	          <Image src='/assets/images/wireframe/short-paragraph.png' />
	        </Item.Description>
	        <Item.Extra>Additional Details</Item.Extra>
	      </Item.Content>
	    </Item>
    )
	}
}

export default Entry;