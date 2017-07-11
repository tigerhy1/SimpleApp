/**
 * @flow
 */

import React from 'react';
import { Button, Platform, ScrollView, StyleSheet,
         Text, TouchableOpacity } from 'react-native';
import { StackNavigator, TabNavigator, TabView, TabBarBottom,
         NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';
import Write from './Write';
import WritePrepare from './WritePrepare';
import WriteFrom from './WriteFrom';
import WriteResult from './WriteResult';
import DetailPage from './Page/DetailPage';
import MainPage from './Page/MainPage';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView style={styles.container}>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigation.navigate('Home')}
      title="Go to home tab"
    />
    <Button
      onPress={() => navigation.navigate('Settings')}
      title="Go to settings tab"
    />

    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => {
  const { state } = navigation;
  if (state.hasOwnProperty('params')) {
    //console.log('Yes');
    console.log(state.params.hasOwnProperty('auto'));
    const { auto } = state.params;
    console.log('auto = ' + auto);
  }
  if (state.hasOwnProperty('params') && state.params.hasOwnProperty('type')) {
      //return (<DetailPage navigation={navigation} autoFocus={true}/>);
      if (state.params.hasOwnProperty('auto')) {
          const { auto, quoteId } = state.params;
          console.log('show auto = ' + auto);
          console.log('quoteId = ' + quoteId);
          return (<DetailPage navigation={navigation} toggle={true} quoteId={quoteId}/>);
      }
      else {
          const { quoteId } = state.params;
          console.log('not show auto = ');
          console.log('quoteId = ' + quoteId);
          return (<DetailPage navigation={navigation} toggle={false} quoteId={quoteId}/>);
      }
  }
  else {
    //return (<MyNavScreen banner="Home Tab" navigation={navigation} />);
    return (<MainPage navigation={navigation} />);
  }
};

MyHomeScreen.navigationOptions = ({ navigation }) => {
  const { state,setParams } = navigation;
  if (state.hasOwnProperty('params') && state.params.hasOwnProperty('type')) {
    return ({
      tabBarLabel: '首页',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),

      headerLeft: (
      <Button
        title={'首页'}
        onPress={() => navigation.navigate('Root')}
      />
      ),
      headerRight: (
        <TouchableOpacity onPress={
             ()=>{ setParams( {type: 'list', auto: 'true'} );  }}>
          <Ionicons name="ios-add" size={30} style={{paddingRight : 10}}  />
        </TouchableOpacity>
      ),
  })}
  else {
    return ({
    tabBarLabel: '首页',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
    headerLeft: (<Text></Text>)
    });
};
};


const MyPeopleScreen = ({ navigation }) => (
  <MyNavScreen banner="People Tab" navigation={navigation} />
);

MyPeopleScreen.navigationOptions = {
  tabBarLabel: '热榜',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-people' : 'ios-people-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MyChatScreen = ({ navigation }) => (
  <WritePrepare banner="WritePrepare Screen" navigation={navigation} />
);

MyChatScreen.navigationOptions = {
  tabBarLabel: '写',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Tab" navigation={navigation} />
);

MySettingsScreen.navigationOptions = {
  tabBarLabel: '我',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-settings' : 'ios-settings-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MyWriteScreen = ({ navigation }) => (
  <Write banner="Write Screen" navigation={navigation} />
);

MyWriteScreen.navigationOptions = props => {
   const { navigation } = props;
   return {
     title: '内容',
     headerRight: (
     <Button
       title={'下一步'}
       onPress={() => navigation.navigate('WriteFrom')}
     />
     ),
   }
}

const MyWriteFromScreen = ({ navigation }) => (
  <WriteFrom banner="Write Screen" navigation={navigation} />
);

MyWriteFromScreen.navigationOptions = props => {
   const { navigation } = props;
   return {
     title: '来源',
     headerRight: (
     <Button
       title={'提交'}
       onPress={()=>{ navigation.navigate('Root', {type: 'list', quoteId: -1}) }}
     />
     ),
   }
}
let currentIndex;

const TabNav = TabNavigator(
  {
    Home: {
      screen: MyHomeScreen,
      path: '',
    },
    People: {
      screen: MyPeopleScreen,
      path: 'cart',
    },
    Chat: {
      screen: MyChatScreen,
      path: 'chat',
    },
    Settings: {
      screen: MySettingsScreen,
      path: 'settings',
    },
  },
  {
    tabBarComponent: (props) => {
      const {navigation, navigationState} = props;
      const jumpToIndex = index => {
        console.log('Jump');

        const lastPosition = navigationState.index
        const tab = navigationState.routes[index]
        const tabRoute = tab.routeName
        console.log('tabRoute = ' + tabRoute);
        //const firstTab = tab.routes[0].routeName

        if (lastPosition !== index) {
          const tabAction = NavigationActions.navigate({ routeName: tabRoute });
          navigation.dispatch(tabAction);
          //navigation.dispatch(pushNavigation(tabRoute));
        }
        else if (lastPosition === index && index === 0) {
           const firstScreenAction = NavigationActions.reset(
             {  index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Root' }) ]
             });
           navigation.dispatch(firstScreenAction);
        }
      }
      return <TabBarBottom {...props} jumpToIndex={jumpToIndex}/>
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
    },

  },

);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

const StacksOverTabs = StackNavigator({
  Root: {
    screen: TabNav,
  },
  Write: {
    screen: MyWriteScreen,
  },

  WriteFrom: {
    screen: MyWriteFromScreen,
  },

  /*WriteResult: {
    screen: WriteResult,
  },*/

});

export default StacksOverTabs;
