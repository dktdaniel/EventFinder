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
      </Menu>
    )
	}
}

export default Navbar;