import { View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { Colors } from '../../constants/Colors'
import DonutCirCularChart from '../../components/DonutCirCularChart'
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import CategoryList from '../../components/CategoryList'
import { supabase } from '../../lib/supabase'

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState(null);

  const router = useRouter();
  useEffect(()=>{
      getCategoryList();
  },[])


  const getCategoryList = async () => {
    const {data:user} = await supabase.auth.getUser();
    const {data, error} = await supabase
    .from('Category')
    .select('*, CategoryItems(*)')
    .eq('created_by', user.user.email)
    if(data){
      setCategoryList(data)
    }
    if(error){
      console.log(error)
    }
    setLoading(false)
  }

  if(loading === true){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color= {Colors.backGround} />
      </View>
    )
  }

  return (
    <SafeAreaView edges={['top']} style={{flex:1, marginHorizontal: 20}}>
      <View style={{flex:1}}>
        <Header/>
        <ScrollView 
          refreshControl={
            <RefreshControl
              onRefresh={()=>getCategoryList()}
              refreshing={loading} 
            />
          }
          showsVerticalScrollIndicator={false}
        >
              <DonutCirCularChart CategoryList={categoryList} />
            <CategoryList CategoryList={categoryList}/>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={()=> router.push('/addNewCategory')} style={{position: 'absolute', bottom: 16, right: 0}}>
        <AntDesign name="pluscircle" size={50} color={Colors.backGround} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home