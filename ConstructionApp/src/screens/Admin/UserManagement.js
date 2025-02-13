import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import api from '../../api/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.username}
            description={item.role}
            left={props => <List.Icon {...props} icon="account" />}
          />
        )}
      />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={() => {/* Add user logic */}}
      />
    </View>
  );
};

export default UserManagement;
