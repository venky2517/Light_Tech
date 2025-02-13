import React from 'react';
import { Appbar } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const CustomHeader = ({ title, navigation }) => {
  const { logout } = useAuth();

  return (
    <Appbar.Header>
      {navigation.canGoBack() && (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content title={title} />
      <Appbar.Action icon="logout" onPress={logout} />
    </Appbar.Header>
  );
};

export default CustomHeader;
