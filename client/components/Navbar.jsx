import React from 'react';
import Search from './Search.jsx';
import { Menu, Icon, Header, Transition, Button } from 'semantic-ui-react';
import FacebookButton from './FacebookButton.jsx';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
      
      <Menu id="nav" widths={4} secondary >

      <Menu.Item>
        <Header as='h1' onClick={() => this.props.changeView('home')}><Icon name='search' verticalAlign='center'/>EventFinder</Header>
      </Menu.Item>

      <Menu.Item>
        <Button onClick={() => this.props.changeView('dashboard')}>Dashboard</Button>
      </Menu.Item>

      <Menu.Item position='right'>
        <FacebookButton fb={FB} getUser={this.props.getUser}/>
      </Menu.Item>

      </Menu>
    )
	}
}

export default Navbar;