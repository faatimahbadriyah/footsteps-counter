import React from 'react';
import { StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import { MapView } from 'expo';

export default class Home extends React.Component {

    static navigationOptions={
        header: null
    }

    static navigationOptions={
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null
        };
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

    render(){
        const {latitude, longitude} = this.state
        console.log(this.state)
        return (            
            <MapView
                style={{flex: 1}}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            />
        );
    }  
}

const styles = StyleSheet.create({
    
});
