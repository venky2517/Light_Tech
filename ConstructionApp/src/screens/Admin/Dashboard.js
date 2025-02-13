import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const AdminDashboard = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Users" 
        component={UserManagement}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={Reports}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="file-chart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminDashboard;
