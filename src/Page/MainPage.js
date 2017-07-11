import React, { Component } from 'react'
import { Button, Platform, ScrollView, StyleSheet, Text, View, ListView } from 'react-native'
import SampleText from '../SampleText'
import Spinner from '../Spinner'
import ArtItemCard from '../Component/ArtItemCard'

export default class MainPage extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    var dataBlob = [];
    let info = {
      quoteId : 0,
      author : 'Caprice',
      content : 'Death is certain, Life is not',
      from : 'training day',
      oo_cnt : '53',
      xx_cnt : '12',
      comment_cnt : '6',
      time : '2017-06-07 17:09:00',
    }
    dataBlob.push(info);
    this.state = {
        dataSource: ds.cloneWithRows(dataBlob),
        loading: true
    };

    var url = "http://localhost:8080/quote/get_quote_list";
    fetch(url,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: ''})
      .then((response) => response.json())
      .then((responseJson) => {
        const quotes = responseJson.list;
        console.log('http result = ' + quotes);
        //this.props.submitFinish();
        for (var i = 0; i < quotes.length; i++) {
          console.log('quote content = ' + quotes[i].content);
          let quote = {
            quoteId : quotes[i].quoteId,
            author : quotes[i].username,
            content : quotes[i].content,
            from : quotes[i].from,
            oo_cnt : quotes[i].ooCnt,
            xx_cnt : quotes[i].xxCnt,
            comment_cnt : quotes[i].commentCnt,
            time : quotes[i].dateTime,
          }
          dataBlob.push(quote);
          console.log('dataBlob size = ' + dataBlob.length);
        }
        this.setState({
            dataSource: ds.cloneWithRows(dataBlob),
            loading: false
        });
        //console.log('ready = ' + this.props.submitParams.ready);
      })
      .catch((error) => {
        console.error(error);
      });


  }

  _renderItem(rowData, sectionID, rowID, highlightRow) {
    const { navigation } = this.props;
    return (<ArtItemCard
                 navigation = { navigation }
                 quoteId = {rowData.quoteId}
                 author = {rowData.author}
                 content = {rowData.content}
                 from = {rowData.from}
                 oo_cnt = {rowData.oo_cnt}
                 xx_cnt = {rowData.xx_cnt}
                 comment_cnt = {rowData.comment_cnt}
                 time = {rowData.time}/>);
  }

  render() {
    const { navigation } = this.props;
    if (!this.state.loading) {
      return (
        <ListView
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
        />
      );
    }

    return (
        <Spinner size="small" />
    );

  }
}

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
