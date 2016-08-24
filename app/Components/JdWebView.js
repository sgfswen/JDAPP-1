'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  WebView,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';

import MenuButton from '../home/MenuBUtton';

export default class JdWebView extends Component {

    constructor(props) {
        super(props);
        console.log(Platform.os);
    }

    _onPressButton(){
      console.log(this.props.nav);
      this.props.nav.pop();

    }

    render() {
        return (
          <View style={styles.container}>
                <TouchableHighlight
                onPress={this._onPressButton.bind(this)}
                style={{height:44,paddingTop:20}}>
                 <Image
                   style={styles.iconImg}
                   source={require('../../images/header/return.png')}
                 />
               </TouchableHighlight>
                <WebView startInLoadingState={true}
                         javaScriptEnabled={true}
                         source={{uri:this.props.url,method:'GET'}}
                         style={{}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    iconImg: {
        resizeMode:'contain',
        width: 22,
        height: 22,
    },
    showText: {
        fontSize: 12
    }
});
