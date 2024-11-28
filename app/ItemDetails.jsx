import { View, Text, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '../lib/supabase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { openURL } from 'expo-linking'
const ItemDetails = () => {
  const [itemDetail, setItemDetail] = useState(null);
  const {ID} = useLocalSearchParams();
  const router = useRouter();
  useEffect(()=>{
    console.log(ID)
    getItemDetails();
  },[])
  const getItemDetails = async () => {
      const {data, error} = await supabase.from('CategoryItems').select('*').eq('id', ID)
      if(data){
          setItemDetail(data[0])
          console.log(data[0])
      }
  }

  const onDelete=async()=>{
    await supabase.from('CategoryItems').delete().eq('id', ID)
    router.replace('/(user)/')
  }

  const openURL = (url) => {
    Linking.openURL(url)
  }

  return (
    <View style={{marginHorizontal: 20, flex: 1}}>
        <Stack.Screen options={{headerShown: true}}/>
        <View style={[{alignItems: 'center', flexDirection: 'row', marginTop: 20, backgroundColor: itemDetail?.color ? itemDetail?.color  : '#ffffff', padding: 20, },{borderRadius: 10}]}>
            <Image style={{width: 150, height: 150, borderRadius: 10}} source={{uri: itemDetail?.image}}/>
            <View style={{width: '53%'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', marginLeft: 30, color: 'white'}}>{itemDetail?.name}</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 30, color: 'white'}} numberOfLines={2}>₹ {itemDetail?.cost}</Text>
            </View>
        </View>
        <View style={{marginTop: 20}}>
            <Text style={{fontSize: 22, fontWeight: '700'}}>Note: </Text>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}} numberOfLines={5}>{itemDetail?.note}</Text>
        </View>
        <View style={{position: 'absolute', bottom: 20, width: '100%', gap: 15}}>
            {itemDetail?.url?<TouchableOpacity onPress={()=>openURL(itemDetail?.url)} style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: itemDetail?.color ? itemDetail?.color  : '#ffffff', borderRadius: 10, alignItems:'center' }}>
              <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>Open</Text>
            </TouchableOpacity>: <View/>}
            <TouchableOpacity onPress={onDelete} style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: itemDetail?.color ? itemDetail?.color  : '#ffffff', borderRadius: 10, alignItems:'center' }}>
              <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ItemDetails