import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';
import { Button, Input } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { getDistance } from 'geolib';
import Geocoder from 'react-native-geocoder';

export default class MapScreen extends Component {
    static navigationOptions={
      header: null
    }
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      latTarget: null,
      longTarget: null,
      jarak: 0
    };
  }

  onSignOut = () =>{
    this.props.navigation.navigate('Login')
  }

  async componentDidMount() {
    const {status} = await Permissions.getAsync(Permissions.LOCATION)

    if( status != 'granted'){
        const response = await Permissions.askAsync(Permissions.LOCATION)
    }

    navigator.geolocation.getCurrentPosition(
        ({coords: {latitude, longitude}})=>this.setState({latitude, longitude}, () => console.log('State : ', this.state)),
        (error) => console.log('Error : ', error)
    )
  }

  calculateDistance(){
    const {latitude, longitude} = this.state;
    this.setState({
      jarak: getDistance(
        { latitude: latitude, longitude: longitude },
        { latitude: -6.931249, longitude: 107.717682 }
      )
    })

  }

  render() {
    const {latitude, longitude, jarak} = this.state;    

    return (
      <View style={styles.overallViewContainer}>
        {this.state.latitude ?
            <MapView
                style={ styles.container }
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} 
            >
                <MapView.Marker 
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                />
            </MapView>
            :
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text>Memuat peta ...</Text>
            </View>
        }
        <View style={styles.allNonMapThings}>
          <View style={styles.inputContainer}>
             <Input
                value = {this.state.asal}
                onChangeText={asal => this.setState({asal})}
                inputContainerStyle={styles.input}
                inputStyle={{paddingLeft: 10}}
                placeholder='Asal'
            />
            <Input
                value = {this.state.tujuan}
                onChangeText={tujuan => this.setState({tujuan})}
                inputContainerStyle={[styles.input,{marginTop: 5}]}
                inputStyle={{paddingLeft: 10}}
                placeholder='Tujuan'
            />
             <Button
                onPress={this.calculateDistance.bind(this)} 
                title= 'Calculate'
                buttonStyle={styles.btn} />
          </View>

          <View style={[styles.inputContainer,{marginTop: 5}]}>
            <Text style={styles.text}>Jarak: {jarak/1000} KM</Text>
            <Text style={styles.text}>Jumlah langkah kaki: {jarak}</Text>
          </View>


          <View style={styles.button} >
            <TouchableOpacity 
              onPress={this.onSignOut}
            > 
              <Text style = {styles.buttonText} >
                Logout 
              </Text>           
            </TouchableOpacity>
          </View> 
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  overallViewContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  input: {
    borderColor:'#68035d',
    borderWidth: 1,
  },
  allNonMapThings: {
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  inputContainer: {
    elevation: 1,
    backgroundColor: 'white',
    width: '90%',
    top: 40,
    padding: 10,
    shadowOpacity: 0.75,
    borderRadius: 20,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0}
  },
  btn:{
    backgroundColor: '#68035d',
    marginTop: 10,
    borderRadius: 0
  },
  button: {
    elevation: 1,
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#68035d',
    borderRadius: 25,
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0}
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  text:{
    paddingLeft: 10,
    paddingTop: 5
  }
});