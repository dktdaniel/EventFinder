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
      ],
      venues: [
        {
          name: '',
          url: '',
          image: '',
          address: '',
          postalCode: ''
        }
      ]
    }
  }

  formatTime(time) {
    var hours = Number(time.slice(0, 2));
    var mins = Number(time.slice(3,5));
    var ampm;

    if(hours > 12) {
        hours = (hours - 12).toString();
        ampm = 'pm';
    } else if (hours < 0) {
        hours = (12).toString();
        ampm = 'am';
    } else if (hours < 12){
        ampm = 'am';
    } else if (hours === 12) {
        ampm = 'pm';
    }

    if (mins < 10) {
        mins = "0" + mins;
    }

  return hours + ":" + mins + ampm
  };

  formatDate(date) {
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    var year = date.slice(0, 4);

  return month + "/" + day + "/" + year
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
        this.setState({events});
      },
      error: data => console.log(data)
    });
  }

  componentWillReceiveProps({userId}) {
    this.setState({userId});
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name }, () => {
      if (this.state.activeItem === 'venues') {
        this.renderVenues();
      }
    });
  }

  renderVenues() {
    $.ajax({
      method: 'POST',
      url: '/dashboardVenues',
      contentType: 'application/json',
      data: JSON.stringify({
        userId: this.state.userId
      }),
      success: (venues) => {
        this.setState({venues});
      },
      error: data => console.log(data)
    });
  }

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
              <ul style={{listStyle: 'none'}}>
                <li>Category: {event.category}</li>
                <li>Venue: {event.venueName}</li>
                <li>Start date: {this.formatDate(event.startDate)}</li>
                <li>Start time: {this.formatTime(event.startTime)}</li>
              </ul>
            </List.Content>
          </List.Item>
        )}
        </List>
        : //venues
        <List animated verticalAlign='middle'>
        {this.state.venues.map((venue, index) => 
          <List.Item key={index}>
            <List.Header as='h3'><a href={venue.url}>{venue.name}</a></List.Header>
            <Image src={venue.image} size='small'/>
            <List.Content>
              <ul style={{listStyle: 'none'}}>
                <li>Address: {venue.address} {venue.postalCode}</li>
              </ul>
            </List.Content>
          </List.Item>
        )}
        </List>
        }
        </Grid.Column>
      </Grid>
    )
  }
}