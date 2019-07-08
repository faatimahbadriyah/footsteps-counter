import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Maps from './Maps';

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
           
        };
    }

    render(){
        console.log(this.state)
        return (
            <View style={styles.container}>
                <View style={{marginTop: 50}}>
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
                    <Maps />
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
