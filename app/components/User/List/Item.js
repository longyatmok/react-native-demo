import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
  Text,
  Modal,
  Platform
} from 'react-native';

import _ from 'lodash';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'stretch',
    height: 50
  },
  photo: {
    flex: 1
  },
  detailContainer: {
    padding: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    flexDirection: 'column',
    flexShrink: 1,
  },
  nameRow: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  userName: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lateCount: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#656565',
  },
  teamBadge: {
    backgroundColor: '#FF3A30',
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    padding: 2
  },
  team: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvatarModalVisible: false,
      isDateModalVisible: false
    };

    this.setAvatarVisible = this.setAvatarVisible.bind(this);
    this.setDateVisible = this.setDateVisible.bind(this);
  }

  setAvatarVisible(visible) {
    this.setState({isAvatarModalVisible: visible});
  }
  setDateVisible(visible) {
    this.setState({isDateModalVisible: visible});
  }

  render() {
    const {
      userInfo,
    } = this.props;

    let thumbnail = { uri: userInfo.avatar_thumbnail_url };
    let source = { uri: userInfo.avatar };

    return (
      <TouchableOpacity
        onPress={() => {
          this.setDateVisible(true);
        }}
        style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.setAvatarVisible(true);
          }}
          style={{
            flex: 1,
            maxWidth: deviceWidth > 374 ? 50 : 40,
            minWidth: deviceWidth > 374 ? 50 : 40,
            backgroundColor: '#E8E8E8',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            resizeMode="cover"
            source={thumbnail}
            style={[
              styles.photo,
              {
                width: deviceWidth > 374 ? 50 : 40,
                height: deviceWidth > 374 ? 50 : 40,
              },
            ]}
          />
        </TouchableOpacity>
        <View style={styles.detailContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.userName} type={'black'}>
              {userInfo.name || 'Unknown?'}
            </Text>
            {userInfo.teams.length > 0 ? userInfo.teams.map((x, i) =>
              <View key={i} style={styles.teamBadge}>
                <Text style={styles.team}>{x}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.lateCount} type={'black'}>
            Late count: {userInfo.late_count || 0}
          </Text>
        </View>
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.isAvatarModalVisible}
            onRequestClose={() => {this.setAvatarVisible(false)}}
            style={{
              flex: 1,
              marginTop: 20,
              height: deviceHeight - (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight),
              backgroundColor: '#A9A9A9'
            }}
            >
            <TouchableOpacity
              onPress={() => {this.setAvatarVisible(!this.state.isAvatarModalVisible)}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F2F2F2'
              }}>
              <View>
                <Image
                  resizeMode='contain'
                  source={source}
                  style={[
                    styles.photo, {
                      width: 300
                    }
                  ]}
                />
              </View>
            </TouchableOpacity>
        </Modal>
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.isDateModalVisible}
            onRequestClose={() => {this.setDateVisible(false)}}
            style={{
              flex: 1,
            }}
            >
            <TouchableOpacity
              onPress={() => {this.setDateVisible(!this.state.isDateModalVisible)}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{
                  width: 300,
                  backgroundColor: '#F2F2F2'
                }}>
                <TouchableOpacity
                  onPress={() => {this.setDateVisible(!this.state.isDateModalVisible)}}
                  style={{
                    alignItems: 'flex-end',
                    backgroundColor: '#FF3A30'
                  }}
                  >
                  <Text style={{
                      padding: 10,
                      color: 'white'
                    }}>X</Text>
                </TouchableOpacity>
                <View style={{margin: 10}}>
                  {userInfo.lates.length > 0 ? userInfo.lates.map((x, i) =>
                    <Text key={i}>{x}</Text>
                  ) : <Text>No late record</Text>}
                </View>
              </View>
            </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    );
  }
}

export default UserItem;
