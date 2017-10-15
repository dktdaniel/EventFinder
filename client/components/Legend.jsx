import React from 'react';
import { Container, Image, Header, Grid, Icon, Dimmer, Segment } from 'semantic-ui-react';

class Legend extends React.Component {
    constructor(props) {
        super(props);
        this.markers = Object.keys(this.props.markers);
    }

    render() {
        return (<Container fluid>
            <div id="legend"> <Header as='h4' id='sort'>Sort by:</Header>
                <ul id="legendList">
                    {this.markers.map((type, key) =>
                        <li onClick={() => this.props.sort(type)} key={key}><img src={this.props.markers[type]} /> {type} </li>
                    )}
                </ul>
            </div>
    </Container>)
    }
}

export default Legend;