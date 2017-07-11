import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SimpleTabs from './SimpleTabs';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';


class SimpleApp extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return(
        <Provider store={store}>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
               <SimpleTabs/>
            </View>
        </Provider>
    );
  }
}

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
