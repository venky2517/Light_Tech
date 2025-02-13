import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    try {
      const role = await login(username, password);
      switch(role) {
        case 'ADMIN':
          navigation.replace('AdminDashboard');
          break;
        case 'TEAM_LEADER':
          navigation.replace('TeamLeaderDashboard');
          break;
        case 'LABOUR':
          navigation.replace('LabourDashboard');
          break;
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Construction Site Management</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button 
        mode="contained" 
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
