import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import services from '../utils/services'
import { Redirect, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
const index = () => {
  const router = useRouter();
  useEffect(()=>{
    checkUser();
  })
  const checkUser=async()=>{
    const user = await services.getData('login');
    if(user!=='true'){
      router.replace('/(auth)/');
    }
    else{
      router.replace('/(user)/')
    }
  }
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <ActivityIndicator size={'large'} color={Colors.backGround}/>
    </View>
  )
}

export default index