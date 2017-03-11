import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Image,
  Platform,
  Text
} from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title
    } = this.props;

    const styles = StyleSheet.create({
      container: {
        top: 0,
        paddingTop: (Platform.OS === 'ios' ? 20 + 5 : 5),
        paddingBottom: 5,
        height: (Platform.OS === 'ios' ? 62 : 42),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3A30',
        overflow: 'hidden',
      },
      rightTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'right',
      },
    });
    return (
      <View style={styles.container}>
        <Text
          style={styles.rightTitle}
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default Header;
