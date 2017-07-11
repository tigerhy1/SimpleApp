import React, { Component } from 'react'
import { Button, Platform, ScrollView, StyleSheet, Text, View, ListView } from 'react-native'
import SampleText from './SampleText'
import Spinner from './Spinner'
import ArtItemCard from './Component/ArtItemCard'

export default class WriteResult extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    var dataBlob = [];
    let info = {
      content : 'Death is certain, Life is not',
      from : 'training day',
      oo_cnt : '53',
      xx_cnt : '12',
      comment_cnt : '9',
    }
    dataBlob.push(info);

    this.state = {
        dataSource: ds.cloneWithRows(dataBlob),
        loading: true
    };
  }

  _renderItem(rowData, sectionID, rowID, highlightRow) {
    return (<ArtItemCard content = {rowData.content}
                 from = {rowData.from}
                 oo_cnt = {rowData.oo_cnt}
                 xx_cnt = {rowData.xx_cnt}
                 comment_cnt = {rowData.comment_cnt}/>);
  }

  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
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
