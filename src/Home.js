import React from 'react';
import { StyleSheet, View, Text, MapView} from 'react-native';
import { Button, Input } from 'react-native-elements';
import * as Permissions from 'expo-permission'

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
            tujuan:'', 
            asal:'', 
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
        return (
            <View style={styles.container}>
                <View>
                    <Input
                        value = {this.state.asal}
                        onChangeText={asal => this.setState({asal})}
                        label='Asal:'
                        inputContainerStyle={styles.input}
                        labelStyle={styles.label}
                        inputStyle={{paddingLeft: 10}}
                        placeholder='type here..'
                    />
                    <Input
                        value = {this.state.tujuan}
                        onChangeText={tujuan => this.setState({tujuan})}
                        label='Tujuan:'
                        inputContainerStyle={styles.input}
                        labelStyle={styles.label}
                        inputStyle={{paddingLeft: 10}}
                        placeholder='type here..'
                    />
                </View>
                <View style={{height: 500}}>
                    {latitude ? 
                        <MapView
                            style={{flex: 1}}
                            initialRegion={{
                                latitude,
                                longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}
                        >

                        </MapView>
                        :
                        <Text>Need Permission</Text>
                    }
                </View>
                <View style={styles.viewBottom}>
                    <Button 
                        title='Logout'
                        buttonStyle={styles.btn}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input:{
        width: 250,
        marginTop: 5,
        borderColor:'#68035d',
        borderWidth: 1,
        borderRadius: 20
    }, 
    label:{
        marginTop: 10, 
        fontStyle:'italic', 
        marginLeft: 10
    },   
    viewBottom: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center', 
        position: 'absolute', 
        bottom: 0, 
        zIndex: 1,
    },
    btn:{
        backgroundColor: '#68035d', 
        marginBottom: 10,
        borderRadius: 20,
        width: 250,
    }
});
