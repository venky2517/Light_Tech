import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera } from 'react-native-image-picker';
import api from '../../api/axios';

const TimeCardEntry = () => {
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

  const submitTimeCard = async () => {
    try {
      const data = new FormData();
      data.append('date', formData.date.toISOString());
      data.append('in_time', formData.in_time.toISOString());
      data.append('out_time', formData.out_time.toISOString());
      if (formData.project_photo) {
        data.append('project_photo', {
          uri: formData.project_photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg'
        });
      }

      await api.post('/timecards/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Time card submitted successfully');
    } catch (error) {
      alert('Error submitting time card');
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={takePhoto} mode="contained" style={styles.button}>
        Take Site Photo
      </Button>
      <Button 
        onPress={submitTimeCard} 
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

export default TimeCardEntry;
