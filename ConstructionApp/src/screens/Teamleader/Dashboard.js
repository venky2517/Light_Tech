import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjectManagement from './ProjectManagement';
import LabourManagement from './LabourManagement';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TeamLeaderDashboard = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Projects" 
        component={ProjectManagement}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="office-building" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Labour" 
        component={LabourManagement}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-group" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TeamLeaderDashboard;
