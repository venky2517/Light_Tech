import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const ProjectForm = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    project_number: '',
    description: '',
    start_date: new Date(),
    end_date: new Date(),
    ...initialValues
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Project Name"
        value={formData.name}
        onChangeText={(text) => setFormData({...formData, name: text})}
        style={styles.input}
      />
      <TextInput
        label="Project Number"
        value={formData.project_number}
        onChangeText={(text) => setFormData({...formData, project_number: text})}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    marginBottom: 16
  }
});

export default ProjectForm;
