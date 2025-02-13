import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import ProjectForm from '../../components/ProjectForm';
import api from '../../api/axios';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 8 }}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>Status: {item.status}</Paragraph>
            </Card.Content>
          </Card>
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
      <ProjectForm visible={visible} onDismiss={() => setVisible(false)} />
    </View>
  );
};

export default ProjectManagement;
