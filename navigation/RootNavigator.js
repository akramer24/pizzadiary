import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { LandingPage, PizzeriaMap } from '../components';

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
    }
  }, {
    initialRouteName: 'PizzeriaMap'
  }
)

const RootNavigator = createSwitchNavigator(
  {
    LandingPage: Navigator,
    Home: HomeTabs
  }
)

export default RootNavigator;