import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { TouchableOpacity } from 'react-native'

const ColourPicker = ({selectedColor, setSelectedColor}) => {
  return (
    <View style={{flexDirection: 'row', gap: 20, marginTop: 15}}>
      {Colors.COLOR_LIST.map((color, index) =>(
        <TouchableOpacity key={index} 
             style={[{backgroundColor: color, width: 30, height: 30, borderRadius: 50},
             selectedColor == color && {borderWidth: 2}]}
             onPress={()=>setSelectedColor(color)}
             >
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default ColourPicker