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
<<<<<<< HEAD
=======

      <Menu.Menu position='right'>
        <Menu.Item name='fb login'>
          <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true"></div>
        </Menu.Item>
      </Menu.Menu>
>>>>>>> upstream/master
      </Menu>
    )
	}
}

export default Navbar;