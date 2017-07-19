import React, { Component } from 'react'
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Keyboard } from 'react-native'
import SampleText from '../SampleText'
import Spinner from '../Spinner'
import ArtItemCard from '../Component/ArtItemCard'
import CommentCard from '../Component/CommentCard'
import InputToolbar from '../Component/InputToolbar'
import { submitFinish } from '../Actions'
import { connect } from 'react-redux'

class DetailPage extends Component {

  constructor(props) {
    super(props);

    console.log('quoteId = ' + this.props.quoteId);


    //this.getIsTypingDisabled = this.getIsTypingDisabled.bind(this);
    this.onInputTextChanged = this.onInputTextChanged.bind(this);
    this.onInputSizeChanged = this.onInputSizeChanged.bind(this);
    this.submitQuote = this.submitQuote.bind(this);

    this._keyboardHeight = 0;
    this.state = {
        loading: false,
        input: false,
        typingDisabled: false,
        composerHeight: MIN_COMPOSER_HEIGHT,
        messagesContainerHeight: //this.getBasicMessagesContainerHeight(0),
                                 Dimensions.get('window').height - NAVBAR_HEIGHT,

        //Dimensions.get('window').height -  NAVBAR_HEIGHT - MIN_COMPOSER_HEIGHT,
        showInput: false
    };


  }

  submitQuote() {
    const {content, from} = this.props.submitParams;
    console.log('content xx = ' + content);
    console.log('from = ' + from);
    var url = "http://localhost:8080/quote/submit_quote";
    fetch(url,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 1,
              content: content,
              from: from
            })})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('http result = ' + responseJson.code);
        console.log('http result quoteId = ' + responseJson.quoteId);

        this.props.submitFinish();
        this.prepareDataImp(responseJson.quoteId);
        //this.setState({ loading: false});
        console.log('ready = ' + this.props.submitParams.ready);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  closeCommentInput() {
    this.setState({
      showInput: false,
      messagesContainerHeight: this.getBasicMessagesContainerHeight(0),
    });
  }
  openCommentInput() {
    this.setState({
      showInput: true,
      messagesContainerHeight: this.getBasicMessagesContainerHeight(MIN_COMPOSER_HEIGHT),
    });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.toggle) {
      if (!this.state.showInput) {
        this.openCommentInput();
      }
      else {
        this.closeCommentInput();
      }
    }

    console.log('componentWillReceiveProps, showInput = ' + nextProps.showInput);
  }

  //TODO
  prepareData() {
    if (this.props.quoteId == -1) {
      return;
    }
    this.prepareDataImp(this.props.quoteId);
  }

  prepareDataImp(realQuoteId) {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({loading: true});
    var url = "http://localhost:8080/quote/get_quote_detail";
    fetch(url,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              quoteId: realQuoteId
            })})
      .then((response) => response.json())
      .then((responseJson) => {
        const quote = responseJson.quote;
        const comments = responseJson.comments;
        console.log('http result quote = ' + quote);
        console.log('http result comments = ' + comments);

        let info = {
          quoteId : quote.quoteId,
          author : quote.username,
          content : quote.content,
          from : quote.from,
          oo_cnt : quote.ooCnt,
          xx_cnt : quote.xxCnt,
          comment_cnt : quote.commentCnt,
          time : quote.dateTime,
        }

        var commentList = [];

        for (var i = 0; i < comments.length; i++) {
          //console.log('comment content = ' + co.content);
          const comment = comments[i];
          let item = {
            author : comment.username,
            content : comment.content,
            oo_cnt : comment.ooCnt,
            xx_cnt : comment.xxCnt,
            time : comment.time,
            quoteId: info.quoteId,
            index : comment.index
          };
          commentList.push(item);
          //console.log('dataBlob size = ' + dataBlob.length);
        }

        console.log("info author= " + info.author);
        //var tmp = commentList.slice(0);
        commentList.reverse();
        this.setState({
           info : info,
           commentList: commentList,
           dataSource: ds.cloneWithRows(commentList),
           loading: false
        });

      })
      .catch((error) => {
        console.error(error);
      });

  }

  componentWillMount () {
    if (this.props.quoteId != -1) {
      this.prepareData();
    }

    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    console.log('will mount');
    if (this.props.submitParams.ready) {
      this.setState({ loading: true});
      //setTimeout(()=>{this.submitQuote()}, 3000);
      this.submitQuote();
    }
  }

  keyboardWillShow (e) {
    this.setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : e.end.height);
    //let newSize = Dimensions.get('window').height - this.getKeyboardHeight() - NAVBAR_HEIGHT - MIN_COMPOSER_HEIGHT;
    let newSize = this.getMessagesContainerHeightWithKeyboard(MIN_COMPOSER_HEIGHT);
    //Dimensions.get('window').height - e.endCoordinates.height - NAVBAR_HEIGHT - MIN_COMPOSER_HEIGHT;
    console.log('keyboardWillShow innn');
    this.setState({messagesContainerHeight: newSize});
  }

  keyboardWillHide (e) {
    console.log('keyboardWillHide innn');
    this.setState({
      messagesContainerHeight: Dimensions.get('window').height,
      showInput: false,
    });
  }

  setIsTypingDisabled(value) {
    this.setState({
      typingDisabled: value
    });
  }

  getIsTypingDisabled() {
    return this.state.typingDisabled;
  }

  onInputTextChanged(text) {
    if (this.getIsTypingDisabled()) {
      return;
    }
    if (this.props.onInputTextChanged) {
      this.props.onInputTextChanged(text);
    }
    this.setState({text});
  }

  getKeyboardHeight() {
    if (Platform.OS === 'android') {
      // For android: on-screen keyboard resized main container and has own height.
      // @see https://developer.android.com/training/keyboard-input/visibility.html
      // So for calculate the messages container height ignore keyboard height.
      return 0;
    } else {
      return this._keyboardHeight;
    }
  }

  getMinInputToolbarHeight() {
    return this.props.renderAccessory ? this.props.minInputToolbarHeight * 2 : this.props.minInputToolbarHeight;
  }

  calculateInputToolbarHeight(composerHeight) {
    return composerHeight + (this.getMinInputToolbarHeight() - MIN_COMPOSER_HEIGHT);
  }

  /**
   * Returns the height, based on current window size, without taking the keyboard into account.
   */
  getBasicMessagesContainerHeight(composerHeight = this.state.composerHeight) {
    const res = Dimensions.get('window').height - this.calculateInputToolbarHeight(composerHeight);
    console.log('in getBasicMessagesContainerHeight, res = ' + res);
    return res;
  }

  setKeyboardHeight(height) {
    this._keyboardHeight = height;
  }

  getMessagesContainerHeightWithKeyboard(composerHeight = this.state.composerHeight) {
    return this.getBasicMessagesContainerHeight(composerHeight) - this.getKeyboardHeight() - NAVBAR_HEIGHT;
  }

  prepareMessagesContainerHeight(value) {
    if (this.props.isAnimated === true) {
      return new Animated.Value(value);
    }
    return value;
  }

  onInputSizeChanged(size) {
    const newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, size.height));
    console.log('newComposerHeight = ' + newComposerHeight);
    const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
    this.setState({
      composerHeight: newComposerHeight,
      messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight),
    });
  }



  submitComment() {

    console.log('text = ' + this.state.text);
    this.setIsTypingDisabled(true);
    var url = "http://localhost:8080/quote/submit_comment";
    fetch(url,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 1,
              quoteId: this.props.quoteId,
              content: this.state.text,
            })})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('http result = ' + responseJson.code);
        if (responseJson.code == 200) {
          this.closeCommentInput();
          const comment = responseJson.comment;
          let item = {
            author : comment.username,
            content : comment.content,
            oo_cnt : comment.ooCnt,
            xx_cnt : comment.xxCnt,
            time : comment.time,
            quoteId: this.props.quoteId,
            index : comment.index
          };
          console.log("comment oo_cnt = " + item.oo_cnt);
          //this.state.commentList.push(item);
          const tmp = [item].concat(this.state.commentList);
          /*const ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          });*/
          this.setIsTypingDisabled(false);
          this.setState({
             text: '',
             commentList: tmp,
             dataSource: this.state.dataSource.cloneWithRows(tmp),
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSend() {
    console.log('onSend');
    this.submitComment();
  }

  renderInputToolbar() {
    if (!this.state.showInput) {
      return (<View></View>);
    }
    const inputToolbarProps = {
      ...this.props,
      showInput: this.state.showInput,
      text: this.state.text,
      composerHeight: Math.max(MIN_COMPOSER_HEIGHT, this.state.composerHeight),
      onSend: this.onSend.bind(this),
      onInputSizeChanged: this.onInputSizeChanged,
      onTextChanged: this.onInputTextChanged,
      textInputProps: {
        ...this.props.textInputProps,
        ref: textInput => this.textInput = textInput,
        maxLength: this.getIsTypingDisabled() ? 0 : this.props.maxInputLength
      }
    };
    if (this.getIsTypingDisabled()) {
      inputToolbarProps.textInputProps.maxLength = 0;
    }
    if (this.props.renderInputToolbar) {
      return this.props.renderInputToolbar(inputToolbarProps);
    }
    return (
      <InputToolbar
        {...inputToolbarProps}
      />
    );
  }

  _renderItem(rowData, sectionID, rowID, highlightRow) {
    return (<CommentCard
                 quoteId = {rowData.quoteId}
                 index = {rowData.index}
                 author = {rowData.author}
                 content = {rowData.content}
                 oo_cnt = {rowData.oo_cnt}
                 xx_cnt = {rowData.xx_cnt}
                 time = {rowData.time}/>);
  }

  render() {
    const { navigation } = this.props;
    const { info } = this.state;
    if (!this.state.loading) {
      return (
        <View>
          <View style={{height: this.state.messagesContainerHeight}}>
            <ArtItemCard author = {info.author}
                         content = {info.content}
                         from = {info.from}
                         oo_cnt = {info.oo_cnt}
                         xx_cnt = {info.xx_cnt}
                         comment_cnt = {info.comment_cnt}
                         time = {info.time}/>
              <ListView enableEmptySections={true}
                  style={styles.listView}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderItem.bind(this)}
              />

            </View>
            <View>
              {this.renderInputToolbar()}
            </View>
        </View>
      );
    }

    return (
        <Spinner size="small" />
    );

  }
}

function mapStateToProps(state) {
  return { submitParams: state.addQuoteParams }
}

export default connect(mapStateToProps, { submitFinish })(DetailPage)

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listView: {
        marginTop: 10
  },
};

const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
});

const NAVBAR_HEIGHT = Platform.select({
  ios: 64,
  android: 54,
});

const MAX_COMPOSER_HEIGHT = 100;

DetailPage.defaultProps = {
    minInputToolbarHeight: 44,
};
