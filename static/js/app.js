var Messages = React.createClass({
  loadMessagesFromServer: function() {
    $.ajax({
      url: './api/public/getmessages/0/',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({messages: data.messages});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {messages: []};
  },
  componentDidMount: function() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval);
  },
  render: function() {
    var clock = new Date().getTime();
    var messageNodes = this.state.messages.map(function(message, index) {
      return <MessageNode message={message} clock={clock}/>
    });
    return (
      <div>
        {messageNodes}
      </div>
    );
  }
});

var MessageNode = React.createClass({
  render: function() {
    return(
      <div className="panel panel-default">
        <div className="panel-body">{this.props.message[1]}</div>
        <div className="panel-footer">
          <img className="message-image" src="http://placehold.it/15x15"/> 
          <strong>Anonymous</strong> <Timestamp clock={this.props.clock} ts={this.props.message[2]}/>
        </div>
      </div>
    );
  }
});

var Timestamp = React.createClass({
  render: function() {
    var seconds = Math.ceil((this.props.clock - this.props.ts) / 1000);
    if(seconds > 3600) {
      return (<small>({Math.floor(seconds / 3600)} hours ago)</small>);
    }
    else if(seconds > 60) {
      return (<small>({Math.floor(seconds / 60)} minutes ago)</small>);
    }
    if(seconds > 3600) {
      return (<small>({seconds} seconds ago)</small>);
    }
  }
});

var app = React.render(
  <Messages pollInterval={30000} />,
  document.getElementById('message-thread')
);
