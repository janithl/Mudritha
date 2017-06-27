'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import natural from 'natural';

import data from './data';

class FeedItem extends Component {
  render() {
    return (
      <div className="feed-item">
        <div className="date">Posted on { this.props.published } / { this.props.source }</div>
        <div className="text">
          <p><a href="#" onClick={() => this.props.onclick(this.props.key)}>
            <strong>{ this.props.title }</strong>
          </a></p>
          <p>{ this.props.content.replace(/<[^>]+>/ig, '') }</p>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeScreen: 'latest', selected: null };
  }

  handleFeedItemClick(key) {
    alert(key);
    this.setState({ selected: key });
  }

  render() {
    const feed = data.items.map((item, index) =>
      <FeedItem 
        key={index.toString()}
        onclick={this.handleFeedItemClick}
        title={item.title}
        source={data.feed.title}
        content={item.content} 
        published={item.pubDate} />
    );

    return (
      <div className="App">
        <h2>News Feed</h2>
        <h1>{this.state.selected}</h1>
        <div className="activity-feed">
          {feed}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);