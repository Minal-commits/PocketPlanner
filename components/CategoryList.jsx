import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

const CategoryList = ({ CategoryList = [] }) => {
  const [categoryLists, setCategoryLists] = useState([]); // Initialize as an empty array
  const router = useRouter();

  useEffect(() => {
    if (CategoryList && CategoryList.length > 0) {
      setCategoryLists(CategoryList); 
    } else {
      setCategoryLists([]);
    }
  }, [CategoryList]);

  const onCategoryClick = (category) => {
    router.push({
      pathname: '/CategoryDetails',
      params: { categoryID: category.id }
    });
  };

  const CalculateTotalCost = (categoryItems) => {
    let total = 0;
    categoryItems.forEach(item => {
      total += item.cost;
    });
    return total;
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Recent Budgets</Text>
      <View style={{ gap: 8, marginTop: 10 }}>
        {categoryLists.length > 0 ? (
          categoryLists.map((category, index) => (
            <TouchableOpacity onPress={() => onCategoryClick(category)} key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  backgroundColor: Colors.LightBackGround,
                  padding: 15,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <View style={{ backgroundColor: category.color, padding: 15, borderRadius: 10 }}>
                  <Text style={{ fontSize: 24, color: 'white' }}>{category.image}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>{category.name}</Text>
                  <Text style={{ fontSize: 16, color: 'gray' }}>{category.CategoryItems.length} items</Text>
                </View>
                <Text style={{ fontSize: 16, color: 'gray' }}>
                  ₹{CalculateTotalCost(category.CategoryItems)}/₹{category.assignedBudget}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: 'gray' }}>No items Available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CategoryList;
