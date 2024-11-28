import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import services from '../../utils/services'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../../constants/Colors'

const profile = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter();

  useEffect(()=>{
    const getUserData = async () => {
      const {data} = await supabase.auth.getUser();
      setUser(data)
    }
    getUserData()
  },[])

  const onSignOut = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
      return;
    }
  
    await services.deleteData('login')
    setLoading(true)
    router.replace('/(auth)/')
  }
  
  if(loading){
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={Colors.backGround}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        {user?<Text style={{fontSize: 20, fontWeight: '700'}}>Email: {user?.user.email}</Text>:<Text>Loading data...</Text>}
        {user?<Text>Account Created at: {new Date(user?.user.created_at).toLocaleDateString()}</Text>:<Text>Loading data...</Text>}
        <TouchableOpacity onPress={onSignOut} style={{paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, backgroundColor: Colors.backGround, marginTop: 20, width: '80%', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default profile