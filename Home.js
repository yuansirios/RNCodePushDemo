import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import codePush from "react-native-code-push"; // 引入code-push

class Home extends Component {

  //如果有更新的提示
  syncImmediate() {
    codePush.sync({
      updateDialog:{
        appendReleaseDescription:true,//是否显示更新description，默认false
        descriptionPrefix:'说明的前缀',//更新说明的前缀。 默认是” Description
        mandatoryContinueButtonLabel:'强制更新',//强制更新的按钮文字. 默认 to “Continue”.
        mandatoryUpdateMessage:'强制更新时，更新通知',//强制更新时，更新通知. Defaults to “An update is available that must be installed.”.
        optionalIgnoreButtonLabel:'忽略',// 非强制更新时，取消按钮文字. Defaults to “Ignore”.
        optionalInstallButtonLabel:'更新',//非强制更新时，确认文字. Defaults to “Install”.
        optionalUpdateMessage:'非强制更新时，更新通知',//非强制更新时，更新通知. Defaults to “An update is available. Would you like to install it?”.
        title:'更新title',//要显示的更新通知的标题. Defaults to “Update available”
      },
      installMode: codePush.InstallMode.IMMEDIATE
      //安装模式
      //ON_NEXT_RESUME 下次恢复到前台时
      //ON_NEXT_RESTART 下一次重启时
      //IMMEDIATE 马上更新
    });
  }

  componentWillMount() {
    codePush.disallowRestart();//禁止重启
    this.syncImmediate(); //开始检查更新
  }

  componentDidMount() {
    codePush.allowRestart();//在加载完了，允许重启
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {/* hoxfix实践 */}
        </Text>
        <Image source={require('./src/imgs/B.png')} style={{ width: 100, height: 100 }} />
        {/* <Text>选择性更新</Text> */}
      </View>
    );
  }
}

//设置检查更新的频率
//ON_APP_RESUME APP恢复到前台的时候
//ON_APP_START APP开启的时候
//MANUAL 手动检查
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};
// 这一行必须要写
Home = codePush(codePushOptions)(Home)

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})