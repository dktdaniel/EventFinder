const React = require('react');
const ReactDOM = require('react-dom');
const Search = require('./components/Search.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Occa</h1>
        <Search />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));