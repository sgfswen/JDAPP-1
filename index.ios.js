/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @shangyunliang
 * Created by shangyunliang on 16/4/12.
 */

import React, { Component } from 'react';
import Dimen from './app/Components/Dimen';
import styles from './app/Styles/Main';
import MainScreen from './MainScreen';
import JdWebView from './app/Components/JdWebView';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
} from 'react-native';

class mydemo extends React.Component {

          render() {
              return (
                <Navigator
                    initialRoute={{name: 'main', index: 0, id:'main'}}
                    renderScene={(route, navigator) => mydemo._renderPage(route,navigator)}
                />
              );
          }

          static _renderPage(route, nav) {
                switch (route.id) {
                    case 'main':
                        return (<MainScreen nav={nav}/>);
                        break;
                    case 'webview':
                        return (<JdWebView url={route.url} nav={nav}/>);
                        break;
                }
          }
}

AppRegistry.registerComponent('mydemo', () => mydemo);
