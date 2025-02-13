import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../api/axios';

const Reports = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reports, setReports] = useState([]);

  const generateReport = async () => {
    try {
      const response = await api.get('/timecards/export_report/', {
        params: {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString()
        }
      });
      setReports(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={generateReport}>
        Generate Report
      </Button>
      <DataTable>
        {/* Report data display */}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});

export default Reports;
