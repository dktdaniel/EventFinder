import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Map from './components/Map.jsx';
import actions from './utils/sendLocation.js';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Legend from './components/Legend.jsx';
import { Transition, Container, Image, Header, Grid, Icon } from 'semantic-ui-react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      display: false,
      name: '',
      userId: '',
      venue: '',
      selectedEvent: {}
    }
  }

  displayEvents(data, id) {
    var events = actions.formatEvents(data, id);
    this.setState({
      events: events,
      venue: events[0].venue,
      display: true
    }, () => console.log('index events', this.state.events));
  }

  hideEvents() {
    this.setState({
      display: false
    });
  }

  changeDisplay() {
    this.setState({
      display: false
    });
  }

  getUser({name, id}) {
    this.setState({name, userId: id});
  }

  favVenue() {
    // if they are not logged in, give an error message
    if (!this.state.name) {
      alert('Please login')
    } else {
    //make ajax call to server and send user ID and venue info
      $.ajax({
        method: 'POST',
        url: '/favVenue',
        contentType: 'application/json',
        data: JSON.stringify({
          userId: this.state.userId,
          givenId: this.state.venue.givenId,
          venueName: this.state.venue.name
          // address: this.state.venue.address, 
          // lat: this.state.venue.lat,
          // lng: this.state.venue.lng, 
          // url: this.state.venue.url,
          // postalCode: this.state.venue.postalCode, 
          // image: this.state.venue.image
        }),
        success: data => alert('Added to favorite venues!')
      });
    }
  }

  addEventToSchedule() {
    console.log(this.state.selectedEvent)
    // if they are not logged in, give an error message
    if (!this.state.name) {
      alert('Please login')
    } else {
    //make ajax call to server and send user ID and venue info
      $.ajax({
        method: 'POST',
        url: '/addSchedule',
        contentType: 'application/json',
        data: JSON.stringify({
          userId: this.state.userId,
          eventId: this.state.selectedEvent.givenId
        }),
        success: data => alert('Added to favorite events!')
      });
    }
    // need to save to both event and schedule tables
  }

  selectEvent(selectedEvent) {
    this.setState({selectedEvent}, this.addEventToSchedule);
  }

  render() {
    return (
      <Transition animation='fade up' duration={2000} transitionOnMount={true}>
        <div id="app-container">
          <Navbar getUser={this.getUser.bind(this)}/>
          <Container fluid style={{ backgroundImage: "url('http://i64.tinypic.com/2r7stqh.jpg')", height: '550px'}}>
              <Header size='huge' id='welcome'>Welcome {this.state.name}</Header>
              <p></p>
              <div><Icon name='arrow down' size='mini'/></div>
              <div><Icon name='arrow down' size='tiny'/></div>
              <div><Icon name='arrow down' size='small'/></div>
              <div><Icon name='arrow down' size='large'/></div>
              <div><Icon name='arrow down' size='big'/></div>
              <div><Icon name='arrow down' size='huge'/></div>
              <Search />
              <div><Icon name='arrow up' size='huge'/></div>
              <div><Icon name='arrow up' size='big'/></div>
              <div><Icon name='arrow up' size='large'/></div>
              <div><Icon name='arrow up' size='small'/></div>
              <div><Icon name='arrow up' size='tiny'/></div>
              <div><Icon name='arrow up' size='mini'/></div>
          </Container>
          <Legend markers={window.eventTypes}/>
          <Map displayEvents={this.displayEvents.bind(this)} changeDisplay={this.changeDisplay.bind(this)}/>
          { this.state.display &&
            <Sidebar events={this.state.events} hideEvents={this.hideEvents.bind(this)} favVenue={this.favVenue.bind(this)} selectEvent={this.selectEvent.bind(this)}/>
          }
        </div>
      </Transition>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
