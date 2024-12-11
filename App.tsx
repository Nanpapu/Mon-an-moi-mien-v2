import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MapScreen from "./src/screens/MapScreen";
import MenuScreen from "./src/screens/MenuScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { RecipeProvider } from './src/context/RecipeContext';
import { AuthProvider } from './src/context/AuthContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap;
                if (route.name === 'Bản đồ') {
                  iconName = focused ? 'map' : 'map-outline';
                } else if (route.name === 'Menu') {
                  iconName = focused ? 'book' : 'book-outline';
                } else {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Bản đồ" component={MapScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
            <Tab.Screen name="Tài khoản" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </RecipeProvider>
    </AuthProvider>
  );
}
