import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import LabourAssignmentModal from '../../components/LabourAssignmentModal';
import api from '../../api/axios';

const LabourManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await api.get('/assignments/');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.labour_name}
            description={`Project: ${item.project_name}`}
            left={props => <List.Icon {...props} icon="account-hard-hat" />}
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
        onPress={() => setVisible(true)}
      />
      <LabourAssignmentModal 
        visible={visible} 
        onDismiss={() => setVisible(false)} 
      />
    </View>
  );
};

export default LabourManagement;
