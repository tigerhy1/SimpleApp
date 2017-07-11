import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  BackAndroid,
  ListView,
  StyleSheet
} from 'react-native';
import Toolbar from './Toolbar';
import { Typo } from './Typography';
import { getColor } from './helpers';
import { setFrom } from './Actions'
import { connect } from 'react-redux'

class WriteFrom extends Component {

  constructor(props) {
    super(props);

    this.state = {
      from: ''
    }
  }

  setFrom(text) {
    console.log("from = " + text);
    this.props.setFrom( {
      from: text
    });
  }

  render() {
    return (
      <View style={ styles.addNotesContainer }>
        <StatusBar
          backgroundColor={getColor('paperTeal700')}
          barStyle="light-content"
          animated={true}
        />
        <Toolbar title="#" color={getColor('paperTeal')}/>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.inputTitleStyle}
            autoFocus={true}
            placeholder='From which...'
            placeholderTextColor='#aaa'
            returnKeyType='next'
            underlineColorAndroid="transparent"
            selectionColor={getColor('paperTeal')}
            onChangeText={(text) =>
              {
                console.log('text = ' + text);
                this.setState({ from: text });
                this.setFrom(text);
              }
            }
            value={this.state.from}
          />

        </View>
      </View>
    )
  }

}

export default connect(null, { setFrom })(WriteFrom)

const styles = StyleSheet.create({
  addNotesContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  textInputContainer: {
    flex: 1
  },
  inputTitleStyle: {
    height: 60,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    //fontFamily: 'Lato-Regular',
    fontSize: 20
  },
  inputDescriptionStyle: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 60,
    //fontFamily: 'Lato-Regular',
    fontSize: 16,
    textAlignVertical: 'top'
  }
})
