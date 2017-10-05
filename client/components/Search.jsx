const React= require('react');

class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="search">
        Enter Location: <input type="text" id="search-input"></input>
      </div>
    )
  }
}

module.exports = Search;
