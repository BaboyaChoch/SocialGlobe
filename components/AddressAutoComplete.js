import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fumi} from 'react-native-textinput-effects';

const API_KEY = 'AIzaSyB22w34wSffOSsP9oFAiXl1_-8ryYfZyJc';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.iconColor = this.props.iconColor;
    this.searchBox = this.props.boxStyle;
    this.container = this.props.containerStyle;
    this.state = {
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false,
    };
  }

  searchLocation = async text => {
    this.setState({searchKeyword: text});
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${this.state.searchKeyword}`,
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          searchResults: response.data.predictions,
          isShowingResults: true,
        });
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  render() {
    return (
      <View style={this.container}>
        <Fumi
          label={'Search Location'}
          iconClass={MaterialCommunityIcons}
          iconName={'map-marker'}
          iconColor={this.iconColor}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          onChangeText={text => this.searchLocation(text)}
          value={this.state.searchKeyword}
          style={this.searchBox}
        />
        {this.state.isShowingResults && (
          <FlatList
            data={this.state.searchResults}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() =>
                    this.setState({
                      searchKeyword: item.description,
                      isShowingResults: false,
                    })
                  }>
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
            style={styles.searchResultsContainer}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {},
  searchResultsContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    top: 50,
    zIndex: 1,
    position: 'absolute',
    flex: 1,
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    zIndex: 1,
    flex: 1,
    flexGrow: 1,
    position: 'absolute',
  },
});
