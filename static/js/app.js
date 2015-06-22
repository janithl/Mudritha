var Messages = React.createClass({
  loadMessagesFromServer: function() {
    $.ajax({
      url: this.props.url,
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
    var messageNodes = this.state.messages.map(function(message, index) {
      return <MessageNode message={message}/>
    });
    return (
      <ul className="table-view">
        <li className="table-view-divider">Recommended movies</li>
        {messageNodes}
      </ul>
    );
  }
});

var MessageNode = React.createClass({
  render: function() {
    return(
      <li className="table-view-cell media">
        <a className="navigate" href="choose-theater.html" data-transition="slide-in">
          <img className="media-object pull-left" src="http://placehold.it/64x64" alt="Placeholder image"/>
          <div className="media-body">
            {this.props.message[1]}
            <p><small>{new Date(this.props.message[2]).toString()}</small></p>
          </div>
        </a>
      </li>
    );
  }
});

var app = React.render(
  <Messages url="./api/public/getmessages/10/" pollInterval={30000} />,
  document.getElementById('main-content')
);
