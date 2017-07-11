import React, { Component } from 'react'
import { Button, Platform, ScrollView, StyleSheet } from 'react-native'
import SampleText from './SampleText'

export default class WritePrepare extends Component {

  render() {
    const { navigation, banner } = this.props;
    return (
      <ScrollView>
        <SampleText>{banner}</SampleText>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Go to home tab"
        />
        <Button
          onPress={() => navigation.navigate('Settings')}
          title="Go to settings tab"
        />
        <Button
          onPress={() => navigation.navigate('Write')}
          title="Go to Write"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
      </ScrollView>
    )
  }
}
