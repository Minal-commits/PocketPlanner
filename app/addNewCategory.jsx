import { View, Text, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import ColourPicker from '../components/ColourPicker';
import { Colors } from '../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { supabase } from '../lib/supabase';
import { Stack, useRouter } from 'expo-router';


const addNewCategory = () => {
const [emoji, setEmoji] = useState('💵');
const [selectedColor, setSelectedColor] = useState(Colors.COLOR_LIST[0])
const [category, setCategory] = useState('');
const [budget, setBudget] = useState('');
const [loading, setLoading] = useState(false);
const router = useRouter();
  const onCreateCategory = async () =>{
    if(Number(budget)<=0){
      Alert.alert('Error', 'Budget must be greater than 0')
      return;
    }
    setLoading(true);
    const {data:user} = await supabase.auth.getUser();
    const {data, error} = await supabase
    .from('Category')
    .insert([{
      name: category,
      created_by: user?.user.email,
      image: emoji,
      color: selectedColor,
      assignedBudget: budget
    }])
    .select();
    if(error){
      Alert.alert('Error', error.message)
    }
    if(data){
      router.replace({
        pathname: "/CategoryDetails",
        params: {
          categoryID : data[0].id
        }
      });
    }
    if(data || error){
      setLoading(false);
    }
  }

  return (
    <View style={{ marginHorizontal: 30,}}>
      <View style={{ alignItems: 'center' }}>
      <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: selectedColor, width: 100, height: 100, borderRadius: 50, marginTop: 20}}>
        <TextInput maxLength={2} placeholder='👾' style={{fontSize: 26, fontWeight: '600', color: 'white'}} value={emoji} onChangeText={setEmoji}/>
      </View>
      <ColourPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
      </View>
      <View style={{marginTop: 20, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth:1, gap: 2, alignItems: 'center'}}>
        <MaterialIcons name="category" size={24} color="gray" />
        <TextInput style={{fontSize: 16, padding: 10, width: '100%'}} placeholder='Category Name' value={category} onChangeText={setCategory}/>
      </View>
      <View style={{marginTop: 20, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth:1, gap: 2, alignItems: 'center'}}>
        <Text style={{fontSize: 24, color: 'gray', paddingHorizontal: 8}}>₹</Text>
        <TextInput style={{fontSize: 16, padding: 10, width: '100%'}} placeholder='Total Budget' keyboardType='numeric' value={budget} onChangeText={setBudget}/>
      </View>
      <TouchableOpacity onPress={onCreateCategory} disabled={!category || !budget} style={{backgroundColor: Colors.backGround, marginTop: 30, padding: 10, borderRadius: 10, alignItems: 'center'}}>
        {loading? <ActivityIndicator size={'large'} color='gray'/> :<Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>Create</Text>}
      </TouchableOpacity>
    </View>
  )
}

export default addNewCategory