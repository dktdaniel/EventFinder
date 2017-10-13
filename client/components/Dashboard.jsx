import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'

export default class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = { activeItem: 'events' }
    }

  handleItemClick(e, { name }) {this.setState({ activeItem: name })}

  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item name='events' active={activeItem === 'events'} onClick={this.handleItemClick} />
            <Menu.Item name='venues' active={activeItem === 'venues'} onClick={this.handleItemClick} />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            This is an stretched grid column. This segment will always match the tab height
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}