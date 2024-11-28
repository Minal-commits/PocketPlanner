import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../constants/Colors';

const screenWidth = Dimensions.get('window').width - 50;

const DonutCirCularChart = ({ CategoryList }) => {
  const [data, setData] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  useEffect(() => {
    if (CategoryList && CategoryList.length > 0) {
      updateChartData();
    }
  }, [CategoryList]);

  const updateChartData = () => {
    let TotalEstimate = 0;
    let chartData = [];
    let otherCost = 0;

    CategoryList?.forEach((item, index) => {
      let itemTotalCost = 0;
      if (index < 4) {
        item.CategoryItems?.forEach((item_) => {
          itemTotalCost += item_.cost;
          TotalEstimate += item_.cost;
        });

        chartData.push({
          name: item.name,
          ItemCost: itemTotalCost,
          color: Colors.COLOR_LIST[index],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        });
      } else {
        item.CategoryItems?.forEach((item_) => {
          otherCost += item_.cost;
          TotalEstimate += item_.cost;
        });
      }
    });

    // Add 'Others' slice
    chartData.push({
      name: 'Others',
      ItemCost: otherCost,
      color: Colors.COLOR_LIST[4],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    });

    setData(chartData);
    setTotalBudget(TotalEstimate);
    console.log('Chart Data:', chartData);
  };

  // Default chart data in case the total budget is zero
  const defaultChartData = [
    {
      name: 'No Data',
      ItemCost: 1, // A placeholder value
      color: '#d3d3d3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ];

  return (
    <View style={{ backgroundColor: Colors.LightBackGround,  borderRadius: 10, }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#4A4947',paddingHorizontal: 20
,
paddingVertical: 20  }}>
        Total Expenses: ₹ {totalBudget}
      </Text>
        {totalBudget > 0 ? (
          <PieChart
            data={data}
            width={screenWidth}
            height={180}
            chartConfig={chartConfig}
            accessor={"ItemCost"}
            backgroundColor={"transparent"}
            absolute
          />
        ) : (
          // Display default chart when budget is zero
          <View/>
        )}

      <View style={{ marginTop: 10, paddingHorizontal: 20, paddingVertical: 20  }}>
        {data.length > 0 && totalBudget > 0 ? (
          data.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <FontAwesome name="circle" size={18} color={item.color} />
              <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8 }}>
                {item.name}: ₹ {item.ItemCost}
              </Text>
            </View>
          ))
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <FontAwesome name="circle" size={18} color="#d3d3d3" />
            <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8 }}>
              No data available
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DonutCirCularChart;
