import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
const CategoryInfo = ({Category}) => {
  const [totalCost, setTotalCost] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if(Category){
      calculateTotal();
    }
  }, [Category])
  const calculateTotal = () =>{
    let total = 0;
    Category?.CategoryItems.forEach(item => {
      total += item.cost;
    })
    setTotalCost(total);
    const perc = (total/ Category.assignedBudget) * 100
    setPercentage(perc);
  }

  const onDelete = () =>{
    // delete category
    Alert.alert('Delete Category','Are you sure you want to delete this category?',[
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          await supabase
          .from('CategoryItems')
          .delete()
          .eq('category_Id', Category.id)

          await supabase
          .from('Category')
          .delete()
          .eq('id', Category.id)

          router.replace('/(user)/');
        }
      }
    ])
  }

  return (
    <View style={{ marginTop: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{alignItems:'baseline'}}>
            <Text style={{fontSize: 25, backgroundColor: Category?.color, padding: 20, borderRadius: 10}}>{Category?.image}</Text>
        </View>
        <View style={{flex:1, marginLeft: 20}}>
            <Text style={{fontSize: 24, fontWeight: '700'}}>{Category?.name}</Text>
            <Text style={{fontSize: 18, fontWeight: '700', color: 'gray'}}>{Category?.CategoryItems.length} items</Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
            <Entypo name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
            <Text>₹ {totalCost}</Text>
            <Text>Total budget: ₹ {Category?.assignedBudget}</Text>
        </View>
        <View style={{height: 15, width: '100%', backgroundColor: '#E0E0E0', marginTop: 10,borderRadius: 50}}>
            <View style={{flex:1, backgroundColor: Category?.color ? Category?.color: '#E0E0E0', width: percentage?percentage +'%':'0%', borderRadius: 50}}></View>
        </View>
      </View>
    </View>
  )
}

export default CategoryInfo