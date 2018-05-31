import { createBottomTabNavigator } from 'react-navigation';
import { PizzeriaMap } from '../components';

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

export default HomeTabs;