const React= require('react');

class Search extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        <input type="text"></input><button type="button">Search</button>
      </div>
    )
  }
}

module.exports = Search;