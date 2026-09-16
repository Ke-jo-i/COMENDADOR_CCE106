import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { INITIAL_EVENTS } from '../../assets/data/mockData';

export default function EventsScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Academic', 'Entertainment', 'Arts', 'Sports'];

  const filteredEvents = INITIAL_EVENTS.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === 'All' || event.category === filter;
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Filter events by title..."
        placeholderTextColor="#94A3B8"
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.chip, filter === cat && styles.activeChip]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.chipText, filter === cat && styles.activeChipText]}>{cat}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.list}>
        {filteredEvents.map((event) => (
          <View key={event.id} style={styles.card}>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <Text style={styles.cardMeta}>{event.date} | {event.location}</Text>
            
            <Link href={`/event/${event.id}`} asChild>
              <Pressable style={styles.linkButton}>
                <Text style={styles.linkButtonText}>Open Event Screen</Text>
              </Pressable>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  searchInput: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', marginBottom: 12 },
  filterContainer: { flexDirection: 'row', marginBottom: 16 },
  chip: { backgroundColor: '#E2E8F0', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  activeChip: { backgroundColor: '#2563EB' },
  chipText: { color: '#475569', fontWeight: '500' },
  activeChipText: { color: '#FFF', fontWeight: 'bold' },
  list: { gap: 12, paddingBottom: 24 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  cardMeta: { fontSize: 13, color: '#64748B', marginVertical: 6 },
  linkButton: { marginTop: 8, alignSelf: 'flex-start' },
  linkButtonText: { color: '#2563EB', fontWeight: '600' },
});