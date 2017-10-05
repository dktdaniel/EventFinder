import React from 'react';
import { Image, Item } from 'semantic-ui-react';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="sidebar">
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
		  </div>
		)
	}
}

export default Sidebar;