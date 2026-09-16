import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { INITIAL_EVENTS } from '../../assets/data/mockData';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const eventData = INITIAL_EVENTS.find((e) => e.id === id) || INITIAL_EVENTS[0];
  const [isJoined, setIsJoined] = useState(eventData.joined);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.category}>{eventData.category}</Text>
        <Text style={styles.title}>{eventData.title}</Text>
        
        <View style={styles.metaBox}>
          <Text style={styles.metaText}>📅 Date: {eventData.date}</Text>
          <Text style={styles.metaText}>⏰ Time: {eventData.time}</Text>
          <Text style={styles.metaText}>📍 Location: {eventData.location}</Text>
        </View>

        <Text style={styles.sectionHeader}>About Event</Text>
        <Text style={styles.description}>{eventData.description}</Text>

        <Pressable
          style={[styles.actionButton, isJoined ? styles.leaveButton : styles.joinButton]}
          onPress={() => setIsJoined(!isJoined)}
        >
          <Text style={styles.actionButtonText}>
            {isJoined ? 'Leave Event' : 'Join Event'}
          </Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  category: { fontSize: 12, fontWeight: 'bold', color: '#2563EB', textTransform: 'uppercase' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0F172A', marginVertical: 8 },
  metaBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginVertical: 12, gap: 6 },
  metaText: { fontSize: 14, color: '#334155' },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginTop: 12, marginBottom: 6 },
  description: { fontSize: 14, color: '#475569', lineHeight: 20 },
  actionButton: { paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  joinButton: { backgroundColor: '#2563EB' },
  leaveButton: { backgroundColor: '#DC2626' },
  actionButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  backButton: { paddingVertical: 10, alignItems: 'center', marginTop: 10 },
  backButtonText: { color: '#64748B', fontWeight: '600' },
});