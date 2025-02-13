import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Button, List } from 'react-native-paper';
import api from '../api/axios';

const LabourAssignmentModal = ({ visible, onDismiss, projectId }) => {
  const [selectedLabours, setSelectedLabours] = useState([]);

  const handleAssign = async () => {
    try {
      await Promise.all(
        selectedLabours.map(labourId => 
          api.post('/assignments/', { labour: labourId, project: projectId })
        )
      );
      onDismiss();
    } catch (error) {
      console.error('Assignment failed:', error);
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <View style={styles.container}>
          <List.Section>
            {/* Labour selection list */}
          </List.Section>
          <Button mode="contained" onPress={handleAssign}>
            Assign Selected
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8
  }
});

export default LabourAssignmentModal;
