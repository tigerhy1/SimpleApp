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
    console.log("props, index = " + this.props.index
      + " oo = " + this.props.oo_cnt + " xx = " +this.props.xx_cnt
      + " content = " + this.props.content);
    this.state = {
      oo_cnt: this.props.oo_cnt,
      xx_cnt: this.props.xx_cnt
    };
  }

  handleOOXX(oo) {
    console.log(this.props.quoteId.toString());
    console.log(this.props.index.toString());
    const id = this.props.quoteId.toString() + "_" + this.props.index.toString();

    console.log("in handleOOXX, id = " + id);
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
              id: id,
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


  componentWillReceiveProps(nextProps) {
    console.log("comment mount, oo_cnt = " + this.props.oo_cnt);
    this.setState({
      oo_cnt: this.props.oo_cnt,
      xx_cnt: this.props.xx_cnt
    });
  }

  render() {
    const {
      author,
      content,
      oo_cnt,
      xx_cnt,
      time,
      quoteId,
      index
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
                       <TouchableOpacity style={styles.touchable} onPress={()=>{this.handleOOXX.bind(this)(true)}}>
                          <Text style={styles.commentText}>OO</Text>
                          <Text style={styles.commentNumber}>[{this.state.oo_cnt}]</Text>
                       </TouchableOpacity>
                       <Text style={styles.commentText}>  XX</Text>
                       <Text style={styles.commentNumber}>[{this.state.xx_cnt}]</Text>
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
    },
    touchable:{
      flexDirection: 'row',
      alignItems: 'center'
    }
});
