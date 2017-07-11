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
import { setContent } from './Actions'
import { connect } from 'react-redux'


class Write extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }

  setContent(text) {
    this.props.setContent( {
      content: text
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

        <View style={styles.textInputContainer}>

          <TextInput
            style={styles.inputDescriptionStyle}
            multiline={true}
            autoFocus={true}
            placeholder=''
            placeholderTextColor='#aaa'
            returnKeyType='done'
            underlineColorAndroid="transparent"
            selectionColor={getColor('paperTeal')}
            onChangeText={(text) => {
              this.setState({content: text});
              this.setContent(text); }}
            value={this.state.content}
          />
        </View>



      </View>
    )
  }

}

export default connect(null, { setContent })(Write)

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
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 60,
    //fontFamily: 'Lato-Regular',
    fontSize: 20,
    textAlignVertical: 'top'
  }
})
