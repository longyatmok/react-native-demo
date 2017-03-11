import React, { Component, PropTypes } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';

import UserList from './components/User';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      jsonData: []
    };
  }

  render() {
    return (
      <View>
        <StatusBar/>
        <UserList/>
      </View>
    );
  }
}

export default App;
