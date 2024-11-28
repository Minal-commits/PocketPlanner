import React from 'react'
import { Stack, Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const RootLayout = () => {
  const IconSize = 20
  return (
    <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: '#FF2E63'}}>
      <Tabs.Screen 
        name='index'
        options={{
          title: 'Home',
          tabBarIcon:({color}) =>(
            <AntDesign name="home" size={IconSize} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon:({color}) =>(
            <FontAwesome5 name="user" size={IconSize} color={color} />
          )
        }}
      />
    </Tabs>
  )
}

export default RootLayout