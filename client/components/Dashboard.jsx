import React, { Component } from 'react';
import $ from 'jquery';
import { Grid, Menu, Segment, List, Image } from 'semantic-ui-react';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: 'events',
      userId: this.props.userId,
      events: [
        {
          name: '',
          category: '',
          startDate: '',
          startTime: '',
          image: '',
          url: ''
        }
      ]
    }
  }

  componentDidMount() {
    //make ajax call to get events
    $.ajax({
      method: 'POST',
      url: '/dashboard',
      contentType: 'application/json',
      data: JSON.stringify({
        userId: this.state.userId
      }),
      success: (events) => {
        console.log('HERE!!!', events);
        this.setState({events});
      },
      error: data => console.log(data)
    });
  }

  componentWillReceiveProps({userId}) {
    this.setState({userId});
  }

  handleItemClick(e, { name }) {this.setState({ activeItem: name }, () => console.log(this.state.activeItem))}

  render() {
    const { activeItem } = this.state
    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item name='events' active={activeItem === 'events'} onClick={this.handleItemClick.bind(this)} />
            <Menu.Item name='venues' active={activeItem === 'venues'} onClick={this.handleItemClick.bind(this)} />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
        {this.state.activeItem === 'events' 
        ? 
        <List animated verticalAlign='middle'>
        {this.state.events.map((event, index) => 
          <List.Item key={index}>
            <List.Header as='h3'><a href={event.url}>{event.name}</a></List.Header>
            <Image src={event.image} size='small'/>
            <List.Content>
              <ul>
                <li>Category: {event.category}</li>
                <li>Venue: {event.venueName}</li>

                <li>Start date: {event.startDate}</li>
                <li>Start time: {event.startTime}</li>
              </ul>
            </List.Content>
          </List.Item>
        )}
        </List>
        : //venues
          <List animated verticalAlign='middle'>
            <List.Item>
              <List.Header as='h3'>Bill Graham Civic Auditorium</List.Header>
              <Image src='https://s1.ticketm.net/dam/v/1d4/939ea548-7253-407c-8e60-e02a27a4c1d4_437981_SOURCE.jpg' size='small'/>
              <List.Content>
                <ul>
                  <li>99 Grove Street</li>
                  <li>94102</li>
                </ul>
              </List.Content>
            </List.Item>
          </List>
        }
        </Grid.Column>
      </Grid>
    )
  }
}