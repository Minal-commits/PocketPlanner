import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { supabase } from '../lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryInfo from '../components/CategoryInfo/CategoryInfo';
import CategoryListItems from '../components/CategoryInfo/CategoryListItems';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const CategoryDetails = () => {
  const {categoryID} = useLocalSearchParams();
  const [category,setCategory] = useState();
  const [leftItemCost, setLeftItemsCost] = useState(0)
  const [loading, setLoading] = useState(true)
  const calculateTotal = (assignedBudget,items) =>{
    let total = 0;
    items.forEach(item => {
      total += item.cost;
    })
    setLeftItemsCost(assignedBudget-total);
  }

  useEffect(()=>{
    getCategoryDetail()
  },[])

  const getCategoryDetail = async() =>{
    const {data, error} = await supabase.from('Category').select('*, CategoryItems(*)').eq('id', categoryID)
    if(data){
      setCategory(data[0])
      calculateTotal(data[0].assignedBudget,data[0].CategoryItems);
    }
    if(data || error){
      setLoading(false)
    }
  }

  if(loading){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' color={Colors.backGround}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
      <View style={{marginHorizontal: 20}}>
        <CategoryInfo Category={category}/>
        <CategoryListItems Category={category}/>
      </View>
      </ScrollView>
        <Link href={{pathname:'/addNewCategoryItem', params:{categoryID: category?.id, leftItemCost: leftItemCost}}} style={{position: 'absolute', bottom: 20, right: 20}}>
          <AntDesign name="pluscircle" size={60} color={Colors.backGround} />
        </Link>
    </SafeAreaView>
  )
}

export default CategoryDetails