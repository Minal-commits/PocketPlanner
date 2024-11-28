import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

const CategoryListItems = ({Category}) => {
const router = useRouter();

const GoItemDetails = (ItemId) =>{
  router.push({
    pathname: '/ItemDetails',
    params: { ID: ItemId }
  })
}
  return (
    <View style={{marginTop: 20}}>
      <Text style={{fontSize: 20, fontWeight: '700'}}>Items List</Text>
      <View style={{marginTop: 20, gap: 10}}>
        {Category?.CategoryItems.length>0 ? Category?.CategoryItems.map((categoryItem, index)=>(
            <TouchableOpacity onPress={()=>GoItemDetails(categoryItem?.id)} key={index} >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: categoryItem.color, padding: 10, borderRadius: 10}}>
                <Image style={{width: 50, height: 50, borderRadius: 10}} source={{uri: categoryItem?.image}}/>
                <View style={{flex: 1,marginLeft: 10}}>
                    <Text style={{color: 'white',fontSize: 20, fontWeight: '600'}}>{categoryItem?.name}</Text>
                    <Text style={{color: 'white',fontSize: 14, fontWeight: '400', color: 'white',width: '90%'}} numberOfLines={1}>{categoryItem?.url}</Text>
                </View>
                <Text style={{color: 'white',fontSize: 20, fontWeight: '700'}}>₹ {categoryItem?.cost}</Text>
            </View>
            </TouchableOpacity>
        )) : <Text style={{color: 'white',fontSize: 26, fontWeight: '700', color: 'gray'}}>No Items here</Text>}
      </View>
    </View>
  )
}

export default CategoryListItems