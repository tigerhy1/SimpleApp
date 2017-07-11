import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { Typo } from '../Typography'
import { getColor } from '../helpers'
import px2dp from '../util/px2dp';
import theme from '../config/theme';

export default class ArtItemCard extends Component {
  constructor(props) {
    super(props);
  }

  handleGoto() {
      const { navigation, quoteId } = this.props;
      navigation.navigate('Root', {type: 'list', quoteId: quoteId});
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
          <Text style={styles.commentText}>OO</Text>
          <Text style={styles.commentNumber}>[{oo_cnt}]</Text>
          <Text style={styles.commentPoint}>·</Text>
          <Text style={styles.commentText}>XX</Text>
          <Text style={styles.commentNumber}>[{xx_cnt}]</Text>
          <Text style={styles.commentPoint}>·</Text>
          <Text style={styles.commentText}>评论</Text>
          <Text style={styles.commentNumber}>[{comment_cnt}]</Text>
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
        alignItems: 'center'
  },
  commentNumber: {
        marginRight: 0,
        marginLeft: 5,
        fontSize: 13,
        //color: theme.grayColor
  },
  commentText: {
      marginRight: 0,
      marginLeft: 0,
      fontSize: 13,
      //color: theme.grayColor
  },
  commentPoint: {
      marginRight: 5,
      marginLeft: 5,
      fontSize: 13,
      //color: theme.grayColor
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
})
