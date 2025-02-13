import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimeCardEntry from './TimeCardEntry';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const LabourDashboard = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="TimeCard" 
        component={TimeCardEntry}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LabourDashboard;
