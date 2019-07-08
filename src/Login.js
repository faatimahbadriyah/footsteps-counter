import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import { Input, Button} from 'react-native-elements';

firebase.initializeApp({
    apiKey: "AIzaSyD4lXip35ubBQ8iTvkLddUekUQe1W4BFkg",
    authDomain: "footsteps-counter.firebaseapp.com",
    databaseURL: "https://footsteps-counter.firebaseio.com",
    projectId: "footsteps-counter",
    storageBucket: "",
    messagingSenderId: "9378081543",
    appId: "1:9378081543:web:563af478b8f24a7f"
});


export default class Login extends React.Component {

    static navigationOptions={
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            email:'', 
            password:'', 
            error:'', 
            loading:false
        };
    }

    onLoginPress(){
        this.setState({error:'', loading:true});
        
        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error:'', loading:false});
            this.props.navigation.navigate('Home');
        })
        .catch(() => {
            this.setState({error:'Authentication Failed', loading:false});
        })
 
    }

    onSignUpPress(){
        this.setState({error:'', loading:true});
        
        const{email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error:'', loading:false});
            this.props.navigation.navigate('Main');
            alert('Pendaftaran berhasil, silahkan login.')
        })
        .catch(() => {
            this.setState({error:'Sign Up Failed', loading:false});
        })
 
    }

    renderButtonOrLoading(){
        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#6b1111"/>
        }

        return <View>
            <Button
                onPress={this.onLoginPress.bind(this)} 
                title= 'Login'
                buttonStyle={styles.btn} />
            
            <Button
                onPress={this.onSignUpPress.bind(this)} 
                title='Sign Up'
                buttonStyle={styles.btn}/>
        </View>
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../assets/icon.png')} style={styles.img} />
                <View>                    
                    <Input
                        value = {this.state.email}
                        onChangeText={email => this.setState({email})}
                        placeholder='email@domain.com'
                        inputContainerStyle={styles.input}
                        leftIcon={{ type: 'ionicon', name: 'ios-mail', color:'#68035d'}}
                        leftIconContainerStyle={{justifyContent: 'center', marginRight: 15}}
                    />
                    <Input
                        value = {this.state.password}
                        onChangeText={password => this.setState({password})}
                        placeholder='*******'
                        inputContainerStyle={styles.input}
                        secureTextEntry
                        leftIcon={{ type: 'ionicon', name: 'ios-lock', color:'#68035d'}}
                        leftIconContainerStyle={{justifyContent: 'center', marginRight: 20}}
                    />
                </View>
                <Text style={styles.textError}>{this.state.error}</Text>
                {this.renderButtonOrLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img:{
        alignSelf: 'center', 
        width: 150, 
        height: 150,
        marginBottom: 20
    },
    input:{
        width: 250,
        marginTop: 10
    },
    textError:{
        color: 'red'
    },
    btn:{
        backgroundColor: '#68035d', 
        width: 250, 
        marginTop: 10,
        borderRadius: 20
    }
});
