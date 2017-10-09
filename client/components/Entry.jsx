import React from 'react';
import { Image, Item, Divider } from 'semantic-ui-react';

class Entry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formattedTime: '',
			formattedDate: ''
		}
		this.formatTime = this.formatTime.bind(this);
	}

	componentDidMount() {
		this.formatTime();
		this.formatDate();
	}

	formatTime() {
		var time = this.props.event.event.startTime;
		var hours = Number(time.slice(0, 2));
		var mins = Number(time.slice(3,5));
		var ampm;

		if(hours > 12) {
			hours = (hours - 12).toString();
			ampm = 'pm';
		} else if (hours < 0) {
			hours = (12).toString();
			ampm = 'am';
		} else if (hours < 12){
			ampm = 'am';
		} else if (hours === 12) {
			ampm = 'pm';
		}

		if (mins < 10) {
			mins = "0" + mins;
		}

		this.setState({
			formattedTime: hours + ":" + mins + ampm
		})
	};

	formatDate() {
		var date = this.props.event.event.startDate;
		var month = date.slice(5, 7);
		var day = date.slice(8, 10);
		var year = date.slice(0, 4);

		this.setState({
			formattedDate: month + "/" + day + "/" + year
		})
	}

	render() {
		return (
			<div id="entrydiv">
			<Item id="entry">
				<Item.Image size="tiny" floated="left"  as="a" href={this.props.event.event.url} src={this.props.event.event.image}/>
	      <Item.Content>
	        <Item.Header as="a" href={this.props.event.event.url}>{this.props.event.event.name}</Item.Header>
	        <Item.Meta>{this.state.formattedDate}</Item.Meta>
	        <Item.Meta>{this.state.formattedTime}</Item.Meta>
	      </Item.Content>
	    </Item>
		</div>
    )
	}
}

export default Entry;
