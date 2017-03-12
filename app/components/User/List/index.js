import React, { Component, PropTypes } from 'react';
import {
  RefreshControl,
  ScrollView,
  ListView,
  View,
  Image,
  Dimensions,
  InteractionManager,
  Platform,
  StatusBar,
  TabBarIOS,
} from 'react-native';

import Item from './Item';
import Header from './Header';

import _ from 'lodash';

const deviceHeight = Dimensions.get('window').height;
const tickImage = 'data:image/png;base64,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';
const crossImage = 'data:image/png;base64,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';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceNormal: new ListView.DataSource({
        rowHasChanged: (r1, r2) => {
          return r1 !== r2;
        },
      }).cloneWithRows([]),
      dataSourceLate: new ListView.DataSource({
        rowHasChanged: (r1, r2) => {
          return r1 !== r2;
        },
      }).cloneWithRows([]),
      selectedTab: 'normal',
      refresh: false
    };

    this.renderRow = this.renderRow.bind(this);
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.reload()
  }

  reload() {
    this.setState({ refresh: true });
    fetch("http://hiring.hkdev.motherapp.com/api/mausers/?format=json")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        var {
          normalList,
          lateList
        } = filterUsers(responseJson);
        this.setState({
          refresh: false,
          dataSourceNormal: this.state.dataSourceNormal.cloneWithRows(normalList),
          dataSourceLate: this.state.dataSourceLate.cloneWithRows(lateList),
        }, () => {
          this.refs.listView && this.refs.listView.scrollTo({ x: 0, y: 0, animated: false });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderRow(rowData) {
    return (
      <Item userInfo={rowData} />
    );
  }

  render() {
    const {
      dataSourceNormal,
      dataSourceLate,
      selectedTab,
      refresh,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: deviceHeight - (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight),
            position: 'relative',
          }}
        >
          <Header title='Users'/>
          <TabBarIOS selectedTab={this.state.selectedTab}>
            <TabBarIOS.Item
              selected={this.state.selectedTab === 'normal'}
              title="Normal"
              icon={{uri: tickImage, scale: 3}}
              onPress={() => {
                  this.setState({
                      selectedTab: 'normal',
                  });
              }}>
                {dataSourceNormal.getRowCount() > 0 ?
                <ListView
                  ref={'listView'}
                  removeClippedSubviews={false}
                  scrollEnabled={!refresh}
                  contentInset={{bottom:49}}
                  automaticallyAdjustContentInsets={false}
                  style={{
                    flexGrow: 1,
                    borderTopWidth: 1,
                    borderColor: '#E6E6E6',
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refresh}
                      onRefresh={this.reload}
                    />
                  }
                  enableEmptySections
                  dataSource={dataSourceNormal}
                  renderRow={this.renderRow}
                />
                : null}
            </TabBarIOS.Item>
            <TabBarIOS.Item
              selected={this.state.selectedTab === 'late'}
              title="Late"
              icon={{uri: crossImage, scale: 5}}
              onPress={() => {
                    this.setState({
                        selectedTab: 'late',
                    });
              }}>
              {dataSourceNormal.getRowCount() > 0 ?
              <ListView
                ref={'listView'}
                removeClippedSubviews={false}
                scrollEnabled={!refresh}
                contentInset={{bottom:49}}
                automaticallyAdjustContentInsets={false}
                style={{
                  flexGrow: 1,
                  borderTopWidth: 1,
                  borderColor: '#E6E6E6',
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refresh}
                    onRefresh={this.reload}
                  />
                }
                enableEmptySections
                dataSource={dataSourceLate}
                renderRow={this.renderRow}
              />
              : null}
            </TabBarIOS.Item>
          </TabBarIOS>

        </View>
      </View>
    );
  }
}

/**
 * Filter users into two groups
 * 1st group with normal late record, i.e. less than 2 times one month
 * 2nd group with bad late record, i.e. >2 times one month
 * @param  {array} userArr [user json]
 * @return {array} normalList [description]
 *         {array} lateList [description]
 */
function filterUsers(userArr) {
  // first get absolute path for all thumbnails
  _.map(userArr, function(user){
    user.avatar_thumbnail_url = 'http://hiring.hkdev.motherapp.com' + user.avatar_thumbnail_url
  })
  // parse date to javascript data
  _.map(userArr, function(user){
    user.lateDates = _.map(user.lates, function(dateString){
        return new Date(dateString);
    });
  });
  var normalList = [];
  var lateList = [];
  // dummy
  _.forEach(userArr, function(user){
    // Check is lates more than 2 in a same calendar month within this year
    var boolObj = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var inserted = false;
    _.forEach(user.lateDates, function(datetime){
      var year = datetime.getYear();
      if(year == new Date().getYear()){
        var month = datetime.getMonth();
        boolObj[month] = boolObj[month] + 1;
      }
    });
    for(var i in boolObj) {
      console.log(boolObj[i]);
      if(boolObj[i] > 2) {
        lateList.push(user);
        inserted = true;
      }
      if(inserted){
        break;
      }
    }
    if(!inserted){
      normalList.push(user);
    }
  });
  console.log(normalList);
  console.log(lateList);
  return {normalList, lateList}
}
export default UserList;
