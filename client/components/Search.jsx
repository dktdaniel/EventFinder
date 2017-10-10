const React= require('react');
import { Container } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container id="search" text>
        <input type="text" id="search-input" placeholder="Enter location"></input>
      </Container>
    )
  }
}

export default Search;
