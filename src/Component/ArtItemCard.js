import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  StyleSheet
} from 'react-native'

import { Typo } from '../Typography'
import { getColor } from '../helpers'
import px2dp from '../util/px2dp';
import theme from '../config/theme';

export default class ArtItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oo_cnt: this.props.oo_cnt,
      xx_cnt: this.props.xx_cnt
    };
  }

  handleGoto() {
    if (this.props.quoteId == undefined) {
      return;
    }
      const { navigation, quoteId } = this.props;
      navigation.navigate('Root', {type: 'list', quoteId: quoteId});
  }

  handleOOXX(oo) {
    if (this.props.quoteId == undefined) {
      return;
    }
    console.log("in handleOOXX");
    const url = 'http://localhost:8080/quote/submit_ooxx';
    fetch(url,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 1,
              id: this.props.quoteId.toString(),
              oo: oo
            })})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('http result = ' + responseJson.code);
        if (responseJson.code == 200) {
          if (oo) {
            console.log("in oo");
            const v = this.state.oo_cnt+1;
            this.setState({oo_cnt: v});
          }
          else {
            const v = this.state.xx_cnt+1;
            this.setState({xx_cnt: v});
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {
      quoteId,
      author,
      content,
      from,
      oo_cnt,
      xx_cnt,
      comment_cnt,
      time,
    } = this.props;


    const background = { backgroundColor: '#ffffff' };

    return (
      <View style={[ styles.cardContainer, background ]}>
        <TouchableOpacity onPress={this.handleGoto.bind(this)}>
            <View style={styles.cardTitleContainer}>
              <View style={styles.headerBar}>
                     <Text style={styles.author}>{author}</Text>
                     <Text style={styles.time}>@ {time}</Text>
              </View>
              <Text style={[ styles.cardTitle, Typo.cardTitle ]}>
                {(content.length > 150) ? content.slice(0, 150) + "..." : content}
              </Text>
            </View>
            <View style={styles.cardDescriptionContainer}>
              <Text style={[ styles.cardDescription, Typo.cardDescription ]}>
                #{from}
              </Text>
            </View>
        </TouchableOpacity>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.touchable} onPress={()=>{this.handleOOXX.bind(this)(true)}}>
            <Text style={[styles.commentText, styles.ooStyle]}>OO</Text>
            <Text style={styles.commentNumber}>[{this.state.oo_cnt}]</Text>
          </TouchableOpacity>
          <Text style={styles.commentPoint}>·</Text>
          <TouchableOpacity style={styles.touchable} onPress={()=>{this.handleOOXX.bind(this)(false)}}>
            <Text style={[styles.commentText, styles.xxStyle]}>XX</Text>
            <Text style={styles.commentNumber}>[{this.state.xx_cnt}]</Text>
          </TouchableOpacity>
          <Text style={styles.commentPoint}>·</Text>
          <TouchableOpacity style={styles.touchable} onPress={this.handleGoto.bind(this)}>
            <Text style={[styles.commentText, styles.pinglunStype]}>评论</Text>
            <Text style={styles.commentNumber}>[{comment_cnt}]</Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  cardContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  cardTitleContainer: {
    justifyContent: 'center'
  },
  cardTitle: {
    marginBottom: 10
  },
  cardDescriptionContainer: {

  },
  cardDescription: {

  },
  bottom: {
        flexDirection: 'row',
        padding: 0,
        paddingTop: 10,
        alignItems: 'center',
  },
  commentNumber: {
        marginRight: 0,
        marginLeft: 5,
        fontSize: 13,
        color: theme.gray2
  },
  commentText: {
      marginRight: 0,
      marginLeft: 0,
      fontSize: 13,
      //color: theme.grayColor
  },
  ooStyle: {
    color: '#faa',
    fontWeight: 'bold'
  },
  xxStyle: {
    color: '#aaf',
    fontWeight: 'bold'
  },
  pinglunStype: {
    color: theme.gray2
  },
  commentPoint: {
      marginRight: 5,
      marginLeft: 5,
      fontSize: 13,
      color: theme.gray2
  },
  author: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
  },
  time: {
      fontSize: 12,
      color: theme.grayColor,
  },
  touchable:{
    flexDirection: 'row',
    alignItems: 'center'
  }
})
