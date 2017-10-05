import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx';
import Map from './components/Map.jsx';
import actions from './sendLocation.js';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      display: false
    }
  }

  displayEvents(data, id) {
    var events = data.filter((event) => {
      if (event.venue.givenId === id) {
        return event.event;
      }
    });
    this.setState({
      events: events,
      display: true
    });
    console.log('THIS:', this);
  }

  render() {
    return (
      <div id="app-container">
        <Navbar />
        <h1>Occa</h1>
        <Search />
        <Map displayEvents={this.displayEvents.bind(this)} />
        <Sidebar events={this.state.events} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
