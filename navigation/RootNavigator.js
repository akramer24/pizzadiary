import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { LandingPage, PizzeriaMap, UserProfile } from '../components';

const Navigator = createStackNavigator(
  {
    LandingPage: {
      screen: LandingPage,
      navigationOptions: {
        title: 'Pizza Diary'
      }
    }
  }, {
    initialRouteName: 'LandingPage'
  }
)

const HomeTabs = createBottomTabNavigator(
  {
    PizzeriaMap: {
      screen: PizzeriaMap,
      navigationOptions: {
        title: 'Map'
      }
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        title: 'Profile'
      }
    }
  }, {
    initialRouteName: 'PizzeriaMap',
    tabBarOptions: {
      activeTintColor: 'black',
      labelStyle: {
        fontSize: 18,
      },
      style: {
        backgroundColor: '#e4e4e4',
      },
    }
  }
)

const RootNavigator = createSwitchNavigator(
  {
    LandingPage: Navigator,
    Home: HomeTabs
  }
)

export default RootNavigator;