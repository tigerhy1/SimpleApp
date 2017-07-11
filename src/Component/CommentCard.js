import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PixelRatio
} from 'react-native'

import { Typo } from '../Typography'
import { getColor } from '../helpers'
import px2dp from '../util/px2dp';
import theme from '../config/theme';

export default class CommentCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      author,
      content,
      oo_cnt,
      xx_cnt,
      time,
    } = this.props;

    return(
        <View style={styles.item}>
            <View style={{flex: 1, marginTop: 10, marginBottom : 10}}>
                <View style={styles.headerBar}>
                     <View style={styles.headerInfo}>
                       <Text style={styles.author}>{author}</Text>
                       <Text style={styles.time}>@ {time}</Text>
                     </View>
                     <View style={styles.oo_xx}>
                       <Text style={styles.commentText}>OO</Text>
                       <Text style={styles.commentNumber}>[{oo_cnt}]</Text>
                       <Text style={styles.commentText}>  XX</Text>
                       <Text style={styles.commentNumber}>[{xx_cnt}]</Text>
                     </View>
                </View>
                <Text style={styles.content}>{content}</Text>

            </View>
        </View>
      );
  }

}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        width: theme.screenWidth,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 17,
        borderTopColor: '#d4d4d4',
        borderTopWidth: 1 / PixelRatio.get()
    },
    content: {
        color: '#000',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 3,
    },
    headerBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      marginBottom: 5,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    author: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 11,
        color: theme.grayColor,
    },
    oo_xx: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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

    infoBar: {
        flexDirection: 'row',
        marginTop: 3
    },
    infoBarText: {
        fontSize: 11,
        color: theme.grayColor
    }
});
