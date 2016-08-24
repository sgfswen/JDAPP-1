/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @shangyunliang
 * Created by shangyunliang on 16/4/12.
 */

'use strict';

import React, { Component } from 'react';
import Dimen from './app/Components/Dimen';
// import styles from './app/Styles/Main';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import Header from './Header';
import HomePage from './app/home/HomePage';
import TabNavigator from 'react-native-tab-navigator';

const HOME = 'home';
const HOME_NORMAL = require('./images/tabs/home_normal.png');
const HOME_FOCUS = require('./images/tabs/home_focus.png');
const CATEGORY = 'category';
const CATEGORY_NORMAL = require('./images/tabs/category_normal.png');
const CATEGORY_FOCUS = require('./images/tabs/category_focus.png');
const FAXIAN = 'faxian';
const FAXIAN_NORMAL = require('./images/tabs/faxian_normal.png');
const FAXIAN_FOCUS = require('./images/tabs/faxian_focus.png');
const CART = 'cart';
const CART_NORMAL = require('./images/tabs/cart_normal.png');
const CART_FOCUS = require('./images/tabs/cart_focus.png');
const PERSONAL = 'personal';
const PERSONAL_NORMAL = require('./images/tabs/personal_normal.png');
const PERSONAL_FOCUS = require('./images/tabs/personal_focus.png');

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedTab: HOME}
    }

    _renderTabItem(img, selectedImg, tag, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    static _createChildView(tag) {
        var url = "";
        if (tag === 'cart') {
            url = require('./images/other/cart.png');
        }else if (tag == 'category') {
            url = require('./images/other/category.png');
        }else if (tag === 'faxian') {
            url = require('./images/other/faxian.png');
        }else if (tag === 'personal') {
            url = require('./images/other/personal.png');
        }

        return (
            <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                <Image source={url} style={{flex:1,resizeMode:'stretch'}}></Image>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header />
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage nav={this.props.nav}/>)}
                    {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY, MainScreen._createChildView(CATEGORY))}
                    {this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN, MainScreen._createChildView(FAXIAN))}
                    {this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, MainScreen._createChildView(CART))}
                    {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, MainScreen._createChildView(PERSONAL))}
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        height: 52,
        backgroundColor: '#303030',
        alignItems: 'center',
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    }
});

/**
http://so.m.jd.com/category/all.html
http://p.m.jd.com/cart/cart.action
https://plogin.m.jd.com/user/login.action?appid=100&returnurl=http%3A%2F%2Fhome.m.jd.com%2FmyJd%2Fhome.action%3Fsid%3D2c3132f573694f56905433b7d38ac66e
*/
