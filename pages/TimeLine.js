import React, { Component } from 'react';
import {Text,TouchableOpacity, View ,StyleSheet,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/services';
import Tweet from './Tweet';
import Socket from 'socket.io-client';

export default class TimeLine extends Component {
  state = {
    tweets : [],
  }
  

static navigationOptions =({navigation})  =>({
   title : 'Inicio',
   headerRight: (
     <TouchableOpacity onPress={ ()=> navigation.navigate('New')}>
      <Icon
      style={{marginRight: 20}}
      name="add-circle-outline" 
      size={24}
      color="#4BB0EE"
      />
     </TouchableOpacity>
   )
})

async componentDidMount(){
  this.subscribeToEvents();
   const response = await api.get('tweets');

    this.setState({ tweets : response.data});

}


subscribeToEvents =() =>{
  const io = Socket('http://10.0.2.2:3000');

  io.on('tweet', data =>{
    this.setState({tweets : [data, ...this.state.tweets] })
  });
  io.on('like', data =>{
    this.setState({tweets : this.state.tweets.map( tweet =>
      tweet._id === data._id ? data : tweet
    ) })
  });
}

  render() {
    return (
      <View style={styles.container}>

      <FlatList
        data ={this.state.tweets}
        keyExtractor={tweet => tweet._id}
        renderItem={({ item }) => <Tweet tweet={item}/>}
        />
      </View>
    )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
