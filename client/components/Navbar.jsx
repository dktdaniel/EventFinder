import React from 'react';
import Search from './Search.jsx';
import { Menu, Icon, Header, Transition } from 'semantic-ui-react';
import FacebookButton from './FacebookButton.jsx';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
      
      <Menu id="nav" widths={3} secondary >

      <Menu.Item>
        <Header as='h1'><Icon name='search' verticalAlign='center'/>EventFinder</Header>
      </Menu.Item>

      <Menu.Item position='right'>
        <FacebookButton fb={FB} updateName={this.props.updateName}/>
      </Menu.Item>

      </Menu>
    )
	}
}

export default Navbar;