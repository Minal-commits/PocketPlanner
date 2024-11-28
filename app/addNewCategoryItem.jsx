import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native'
import { Colors } from '../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import { decode } from 'base64-arraybuffer';
import ColourPicker from '../components/ColourPicker';


const addNewCategoryItem = () => {
  const defaultImage = 'https://cdn2.iconfinder.com/data/icons/jetflat-multimedia/90/004_030_add_image_painting_photo_picture_gallery_album-1024.png';
  const {categoryID,leftItemCost} = useLocalSearchParams();
  const [image, setImage] = useState(null);
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [previewImage, setPreviewImage] = useState(defaultImage);
  const [selectedColor, setSelectedColor] = useState(Colors.COLOR_LIST[0])
  const [leftItemsCost, setLeftItemsCost] = useState(0)
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLeftItemsCost(leftItemCost)
  }, [leftItemCost])

  const isValidURL = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol (http or https)
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-zA-Z\\d_]*)?$', // fragment locator
      'i' // case-insensitive flag
    );
    return !!urlPattern.test(url);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true,
    });
  
    if (!result.canceled) {
      const asset = result?.assets[0];
      if (asset?.base64) {
        setImage(asset.base64);
        setPreviewImage(asset.uri);
      } else {
        Alert.alert("Error", "Could not retrieve the image.");
      }
    } else {
      console.warn("Image picking was canceled");
    }
  };

  const onClickAdd = async () => {
    if(Number(leftItemsCost) < Number(cost)){
      Alert.alert('Reduce your budget', 'Cost exceeds the budget');
      return
    }
    if(Number(cost) <= 0){
      Alert.alert(`cost can't be zero`, 'cost can not be zero or negative');
      return
    }
    if (url && !isValidURL(url)) {
      Alert.alert('Invalid URL', 'Please provide a valid URL');
      return;
    }
    if(isNaN(cost)){
      Alert.alert('Invalid cost', 'Please provide a valid cost');
      return;
    }
      try {
        setLoading(true);
        let fileUrl = previewImage === defaultImage ? defaultImage : null;
        if (image && previewImage !== defaultImage) {
          const {data:user} = await supabase.auth.getUser();
          const fileName = user?.user.email + Date.now();
    
          const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('ItemImage')
            .upload(fileName + '.png', decode(image), {
              contentType: 'image/png',
            });
    
          if (uploadError) {
            console.error('Image upload error:', uploadError);
            Alert.alert('Upload Error', 'Could not upload image.');
            return;
          }
          fileUrl = `https://idkddxauikiqauscnvhg.supabase.co/storage/v1/object/public/ItemImage/${uploadData?.path}`;
        }
    
        const { data: insertData, error: insertError } = await supabase
          .from('CategoryItems')
          .insert([{
            name: item,
            url: url,
            cost: cost,
            color: selectedColor,
            note: note,
            category_Id: categoryID,
            image: fileUrl,
          }]);
    
        if (insertError) {
          console.error('Database insert error:', insertError);
          Alert.alert('Insert Error', 'Could not add item to the database.');
        }
    
      } catch (error) {
        console.error('Unexpected error:', error);
        Alert.alert('Error', 'Something went wrong.');
      } finally{
        setLoading(false);
        router.replace('/(user)/');
      }
  };



  return (
    <KeyboardAvoidingView>
    <ScrollView>
      <View style={{alignItems: 'center', marginHorizontal: 40, marginTop: 20}}>
      <TouchableOpacity onPress={pickImage} style={{alignItems: 'center'}}>
        <Image 
          style={{width: 150, height: 150, borderRadius: 99}} 
          source={{ uri: previewImage }} 
        />
      </TouchableOpacity>
        <ColourPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
      <View style={{marginTop: 20, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth:1, gap: 2, alignItems: 'center'}}>
        <MaterialIcons name="category" size={24} color="gray" />
        <TextInput style={{fontSize: 16, padding: 10, width: '100%'}} placeholder='Category Name' value={item} onChangeText={setItem}/>
      </View>
      <View style={{marginTop: 20, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth:1, gap: 2, alignItems: 'center'}}>
        <Text style={{fontSize: 24, color: 'gray', paddingHorizontal: 8}}>₹</Text>
        <TextInput style={{fontSize: 16, padding: 10, width: '100%'}} placeholder='Total Budget' keyboardType='numeric' value={cost} onChangeText={setCost}/>
      </View>
      <View style={{marginTop: 20, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth:1, gap: 2, alignItems: 'center'}}>
        <MaterialIcons name="insert-link" size={24} color="gray" />
        <TextInput textContentType='url' style={{fontSize: 16, padding: 10, width: '100%'}} placeholder='Url' value={url} onChangeText={setUrl}/>
      </View>
      <View style={{marginTop: 20, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth:1, gap: 2, alignItems: 'center'}}>
        <MaterialIcons name="edit" size={24} color="gray" />
        <TextInput style={{fontSize: 16, padding: 10, width: '100%'}} placeholder='Any note' value={note} onChangeText={setNote}/>
      </View>
      <TouchableOpacity onPress={onClickAdd} disabled={!item || !cost} style={{backgroundColor: Colors.backGround, paddingVertical: 10,paddingHorizontal: 20, width: '100%', marginTop: 20, borderRadius: 10, alignItems: 'center'}}>
        {loading? <ActivityIndicator size={'large'} color='gray'/> : <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>Add Item</Text>}
      </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default addNewCategoryItem;
