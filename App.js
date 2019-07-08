import Home from './src/Home';
import Login from './src/Login';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Home: {screen: Home},
});

const App = createAppContainer(MainNavigator);

export default App;
