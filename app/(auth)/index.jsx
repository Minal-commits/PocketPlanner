import { Image, Text, TextInput, View, KeyboardAvoidingView, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import { supabase } from '../../lib/supabase'
import LoginImage from '../../assets/images/AppImages/Login.jpg'
import { Button } from '@rneui/themed/dist/Button'
import { TouchableOpacity } from 'react-native'
import {Colors} from '../../constants/Colors'
import services from '../../utils/services'
const index = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const onSignIn = async () =>{
    setLoading(true)
    const {data , error} = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    })
    if(error){
      Alert.alert(error.message);
      setLoading(false)
      return
    }
    if(data){
      await services.storeData('login', 'true')
      router.replace("/(user)/")
    }
    setLoading(false)
  }

  const onsignUp = async() => {
    setLoading(true)
    const {data,error} = await supabase.auth.signUp({
      email: email,
      password: pass
    })
    if(error){
      Alert.alert(error.message);
    }
    if(data){
      Alert.alert('Please sign in now with your credentials')
    }
    setLoading(false)
  }

  if(loading){
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size='large' color={Colors.backGround} />
      </View>
    )
  }

  return (
    <View style={{flex:1}}>
    <KeyboardAvoidingView
        style={{flex: 1}}
        behavior='padding'
        // keyboardVerticalOffset={60}
    >
      <Stack.Screen options={{
        headerShown: false
      }}/>
      <Image source={LoginImage} style={{width: '100%', height: "55%"}} />
      <View style={{
        paddingHorizontal: 20,
        paddingTop: 30,
        gap: 10,
        flex: 1,
      }}>
        <View>
        <Text style={{
            fontSize: 18,
            fontWeight: '600',
            paddingBottom: 5
        }}>Email</Text>
        <TextInput 
            style={{
                backgroundColor: 'white',
                width: '100%', 
                padding: 10,
                fontSize: 14,
            }} 
            placeholder='Enter Email'
            value={email}
            onChangeText={setEmail}
        />
        </View>
        <View style={{
            marginBottom: 20
        }}>
        <Text style={{
            fontSize: 18,
            fontWeight: '600',
            paddingBottom:  5
            }}>Password</Text>
        <TextInput 
            style={{
                backgroundColor: 'white',
                width: '100%', 
                padding: 10,
                fontSize: 14
            }} 
            secureTextEntry
            placeholder='Enter Password'
            value={pass}
            onChangeText={setPass}
        />
        </View>
      <View style={{ width: '100%', gap: 10}}>
      <TouchableOpacity onPress={onSignIn} disabled={loading} style={{backgroundColor: Colors.backGround, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', width: '100%'}}>
        <Text style={{fontSize: 18, color: 'white', fontWeight: '700'}}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onsignUp} disabled={loading} style={{backgroundColor: Colors.backGround, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', width: '100%'}}>
        <Text style={{fontSize: 18, color: 'white', fontWeight: '700'}}>Sign up</Text>
      </TouchableOpacity> 
      </View>   
      </View>
    </KeyboardAvoidingView>
    </View>
  )
}

export default index
