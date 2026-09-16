import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { INITIAL_PROFILE } from '../../assets/data/mockData';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile details updated locally!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.disabledInput]}
          value={profile.name}
          editable={isEditing}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.disabledInput]}
          value={profile.email}
          editable={isEditing}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
        />

        <Text style={styles.label}>Student ID</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.disabledInput]}
          value={profile.studentId}
          editable={isEditing}
          onChangeText={(text) => setProfile({ ...profile, studentId: text })}
        />

        <Text style={styles.label}>Department</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.disabledInput]}
          value={profile.department}
          editable={isEditing}
          onChangeText={(text) => setProfile({ ...profile, department: text })}
        />

        {isEditing ? (
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  label: { fontSize: 13, fontWeight: 'bold', color: '#64748B', marginBottom: 4, marginTop: 12 },
  input: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#CBD5E1', color: '#0F172A' },
  disabledInput: { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0', color: '#475569' },
  editButton: { backgroundColor: '#2563EB', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  saveButton: { backgroundColor: '#16A34A', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});