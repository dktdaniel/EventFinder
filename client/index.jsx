const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./components/Search.jsx');
const Map = require('./components/Map.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="app-container">
        <h1>Occa</h1>
        <Search />
        <Map />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));