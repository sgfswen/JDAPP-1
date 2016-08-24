'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    ListView,
    RefreshControl,
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import MenuButton from './MenuBUtton';

const BANNER_IMGS = [
    require('../../images/banner/banner1.jpg'),
    require('../../images/banner/banner2.jpg'),
    require('../../images/banner/banner3.jpg'),
    require('../../images/banner/banner4.jpg'),
    require('../../images/banner/banner5.jpg'),
    require('../../images/banner/banner6.jpg'),
    require('../../images/banner/banner7.jpg'),
    require('../../images/banner/banner8.jpg')
];

const len = 160;

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this._onMenuClick = this._onMenuClick.bind(this);
        this._onRecommendClick = this._onRecommendClick.bind(this);
        this._renderRow = this._renderRow.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            listData: ds
        }
    }

    componentWillMount() {
        fetch('http://m.jd.com/index/recommend.action?_format_=json&page=1')
            .then((res)=> res.json())
            .then((str)=> {
                let arr = JSON.parse(str.recommend).wareInfoList;
                var rows = [];
                for (let i = 0; i < arr.length; i += 2) {
                    var item = {id: i, left: null, right: null};
                    item.left = (arr[i]);
                    if (i < arr.length - 1) {
                        item.right = (arr[i + 1]);
                    }
                    rows.push(item);
                }
                var ds = this.state.listData.cloneWithRows(rows);
                this.setState({listData: ds});
            });
    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page}/>
        );
    }

    _onMenuClick(title, tag) {
        Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    _onRecommendClick(wareId) {
        let url = 'http://item.m.jd.com/product/' + wareId + '.html';
        console.log(url);
        this.props.nav.push({
            id: 'webview',
            title: 'webview',
            url: url
        });
    }

    _renderRow(rowData) {
        return (
            <View style={{flexDirection:'row'}}>
                <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                          onPress={()=>{this._onRecommendClick(rowData.left.wareId)}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={{uri:rowData.left.imageurl}}
                               style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.left.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View
                            style={{flexDirection:'row',width:len, marginTop: 6, marginBottom: 22,alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>￥{rowData.left.jdPrice}</Text>
                            <TouchableWithoutFeedback>
                                <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',borderRadius:3,justifyContent: 'center',
alignItems: 'center'}}>
                                    <Text
                                        style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                          onPress={()=>{this._onRecommendClick(rowData.right.wareId)}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={{uri:rowData.right.imageurl}}
                               style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.right.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View
                            style={{flexDirection:'row',width:len, marginTop: 6, marginBottom: 22,alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>￥{rowData.right.jdPrice}</Text>
                            <TouchableWithoutFeedback>
                                <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',borderRadius:3,justifyContent: 'center',
alignItems: 'center'}}>
                                    <Text
                                        style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    render() {
        return (
            <ListView
                style={{flex:1,backgroundColor:'white'}}
                dataSource={this.state.listData}
                renderRow={this._renderRow}
                renderHeader={()=>{return(
                <View>
                    <ViewPager
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('../../images/home_icons/jingdongchaoshi.png')}
                                    showText={'京东超市 '} tag={'jdcs'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/quanqiugou.png')}
                                    showText={'全球购'} tag={'qqg'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/chongzhizhongxin.png')}
                                    showText={'充值'} tag={'cz'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/fuzhuangcheng.png')}
                                    showText={'服装城'} tag={'fzc'}
                                    onClick={this._onMenuClick}/>
                    </View>
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('../../images/home_icons/jingdongjinrong.png')}
                                    showText={'京东金融'} tag={'jdjr'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/lingquan.png')}
                                    showText={'领券'} tag={'lq'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/wuliuchaxun.png')}
                                    showText={'物流查询'} tag={'wlcx'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/wodeguanzhu.png')}
                                    showText={'我的关注'} tag={'wdgz'}
                                    onClick={this._onMenuClick}/>
                    </View>
                    <View style={{marginTop:15,borderWidth:0.5,borderColor:'#ccc'}}/>
                    <Text style={{color:'#7f7f7f',fontSize:12,padding:10}}>猜你喜欢</Text>
                </View>)}}>
            </ListView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width:375,
        height:175,
        resizeMode: 'cover'
    },
    menuView: {
        flexDirection: 'row',
        marginTop: 10
    },
    recommendTitle: {
        width: len,
        flexWrap: 'wrap',
        fontSize: 12,
        color: 'black',
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        height: 30
    },
    priceText: {
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 13,
        color: '#f15353'
    }
});
