import React, { Component } from 'react';
import styles from '../Styles/Main';
import {
  AppRegistry,
  Text,
  View,
  Dimensions,
} from 'react-native';

class Dimen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>当前屏幕的宽{Dimensions.get('window').width}</Text>
        <Text>当前屏幕的高{Dimensions.get('window').height}</Text>
        <Text>当前屏幕分辨率{Dimensions.get('window').scale}</Text>
      </View>
    );
  }
}

export { Dimen as default };
