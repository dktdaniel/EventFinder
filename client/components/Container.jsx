const React = require('react');
const KEY = require('../../config.js');
const GoogleApiComponent = require('google-maps-react');

class Container extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    
    const style = {
      width: '100vw',
      height: '100vh'
    }
    
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: KEY
})(Container)