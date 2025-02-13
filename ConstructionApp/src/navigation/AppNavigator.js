import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import AdminDashboard from '../screens/admin/Dashboard';
import TeamLeaderDashboard from '../screens/teamleader/Dashboard';
import LabourDashboard from '../screens/labour/Dashboard';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          {user.role === 'ADMIN' && (
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          )}
          {user.role === 'TEAM_LEADER' && (
            <Stack.Screen name="TeamLeaderDashboard" component={TeamLeaderDashboard} />
          )}
          {user.role === 'LABOUR' && (
            <Stack.Screen name="LabourDashboard" component={LabourDashboard} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
