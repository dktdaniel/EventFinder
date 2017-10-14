import React from 'react';

class FacebookButton extends React.Component {
   constructor(props) {
      super(props);
      this.FB = props.fb;
      this.state = {
         name: ''
      };
   }

   componentDidMount() {
      this.FB.Event.subscribe('auth.logout', 
         this.onLogout.bind(this));
      this.FB.Event.subscribe('auth.statusChange', 
         this.onStatusChange.bind(this));
   }
      
   onStatusChange(response) {
      var self = this;
      if (response.status === "connected") {
         this.FB.api('/me', function(response) {
            console.log(response)
            self.setState({
               name: response.name
            });
            self.props.getUser(response);
         })
      }
   }

   onLogout(response) {
      this.setState({
         message: ""
      });
   }

  render() {
    
    return (<div>
      <div id="fb-root"></div>
        <div
        className="fb-login-button" 
        data-max-rows="1" 
        data-size="medium" 
        data-button-type="login_with" 
        data-show-faces="false" 
        data-auto-logout-link="true" 
        >
        </div>
      </div>);
  }
}

export default FacebookButton;