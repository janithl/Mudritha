import React, { Component } from 'react';
import { Menu, Feed } from 'semantic-ui-react';
import natural from 'natural';

import logo from './logo.png';
import './App.css';
import data from './data';

class FeedItem extends Component {
  handleClick = () => console.log(this.props.key) //this.props.onclick(this.props.key)

  render() {
    return (
      <a onClick={this.handleClick}>
        <div>
          <h3>{ this.props.title }<small>{ this.props.source }</small></h3>
          <p>{ this.props.content.replace(/<[^>]+>/ig, '') }</p>
          <p><small>Posted on { this.props.published }</small></p>
        </div>
      </a>
    );
  }
}

class App extends Component {
  state = { activeScreen: 'latest', selected: null }

  handleItemClick = (e, { name }) => this.setState({ activeScreen: name })
  handleFeedItemClick = (key) => this.setState({ selected: key })

  render() {
    const { activeScreen } = this.state;
    var distance = natural.JaroWinklerDistance("janith","mitra");

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
        <Menu stackable>
          <Menu.Item>
            <img className="nav-logo" src={logo} alt="App Logo" />
          </Menu.Item>

          <Menu.Item
            name='latest'
            active={activeScreen === 'latest'}
            onClick={this.handleItemClick}>
            Latest
          </Menu.Item>
        </Menu>

        <h1>{this.state.selected}</h1>

        {feed}
      </div>
    );
  }
}

export default App;
