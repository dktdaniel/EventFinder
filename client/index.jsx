const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Occa</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));