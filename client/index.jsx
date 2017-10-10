import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx';
import Map from './components/Map.jsx';
import actions from './utils/sendLocation.js';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Legend from './components/Legend.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      display: false
    }
  }

  displayEvents(data, id) {
    var events = actions.formatEvents(data, id);
    this.setState({
      events: events,
      display: true
    });
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

  render() {
    return (
      <div id="app-container">
        <Navbar />
        <h1>EventFinder</h1>
        <Search />
        <Legend markers={window.eventTypes}/>
        <Map displayEvents={this.displayEvents.bind(this)} changeDisplay={this.changeDisplay.bind(this)}/>
        { this.state.display &&
          <Sidebar events={this.state.events} hideEvents={this.hideEvents.bind(this)}/>
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
