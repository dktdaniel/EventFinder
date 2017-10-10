import React from 'react';
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
      <Menu id="nav">
        <Menu.Item name='editorials'>
          EventFinder
        </Menu.Item>
         <Menu.Item name='fb login'>
         <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false"></div>
        </Menu.Item>
      </Menu>
    )
	}
}

export default Navbar;