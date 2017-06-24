import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import natural from 'natural';

import logo from './logo.png';
import './App.css';

class App extends Component {
  state = { activeScreen: 'latest' }

  handleItemClick = (e, { name }) => this.setState({ activeScreen: name })

  render() {
    const { activeScreen } = this.state;
    var distance = natural.JaroWinklerDistance("janith","mitra");

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

        <p>{distance}</p>
      </div>
    );
  }
}

export default App;
