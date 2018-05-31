import { createStackNavigator } from 'react-navigation';
import { LandingPage, Home } from '../components';

const RootNavigator = createStackNavigator(
  {
    LandingPage: {
      screen: LandingPage,
      navigationOptions: {
        title: 'Pizza Diary'
      }
    },
    Home: {
      screen: Home
    }
  }, {
    initialRouteName: 'LandingPage'
  }
)

export default RootNavigator;