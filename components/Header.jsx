import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants/Colors'
import { supabase } from '../lib/supabase'
const Header = () => {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const getUserData = async () =>{
    const {data} = await supabase.auth.getUser();
    setUser(data);
  }
  const removegmail = () =>{
    if(user?.user.email.includes('@gmail.com')){
      setName(user?.user.email.split('@gmail.com')[0])
    }
    return
  }
  useEffect(()=>{
    getUserData();
    removegmail();
  }, [user])
  return (
    <View style={{flexDirection: 'row', gap: 15, alignItems: 'center', paddingVertical: 20,justifyContent: 'space-between'}}>
      <View>
        <Text style={{fontSize: 24}}>Welcome</Text>
        <Text style={{fontSize: 20, fontWeight: '600'}}>{name} 👋</Text>
      </View>
    </View>
  )
}

export default Header