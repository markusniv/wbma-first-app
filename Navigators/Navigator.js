import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Views/Home';
import Profile from '../Views/Profile';
import Single from '../Views/Single';
import Login from '../Views/Login';
import Upload from '../Views/Upload';
import {MainContext} from '../Contexts/MainContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabel: "Upload",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="upload" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
};


const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Single"
            component={Single}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
          />
        </>
      )
      }
    </Stack.Navigator>
  );
};


const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;