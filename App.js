import Home from './src/Home';
import Login from './src/Login';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Login: {screen: Login},
});

const App = createAppContainer(MainNavigator);

export default App;
