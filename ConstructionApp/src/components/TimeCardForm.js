import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera } from 'react-native-image-picker';

const TimeCardForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    in_time: new Date(),
    out_time: new Date(),
    project_photo: null
  });

  const takePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8
    });
    if (!result.didCancel) {
      setFormData(prev => ({...prev, project_photo: result.assets[0]}));
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={takePhoto} mode="contained" style={styles.button}>
        Take Site Photo
      </Button>
      <Button 
        onPress={() => onSubmit(formData)} 
        mode="contained" 
        style={styles.button}
      >
        Submit Time Card
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  button: {
    marginVertical: 8
  }
});

export default TimeCardForm;
