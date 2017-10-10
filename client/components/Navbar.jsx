import React from 'react';
import Search from './Search.jsx';
import { Menu, Icon, Header } from 'semantic-ui-react';

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

      </Menu>
    )
	}
}

export default Navbar;