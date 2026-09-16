import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { INITIAL_EVENTS } from '../../assets/data/mockData';

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width > 600;

  const joinedEvents = INITIAL_EVENTS.filter((event) => event.joined);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Welcome Back!</Text>
      <Text style={styles.sectionTitle}>Your Joined Events ({joinedEvents.length})</Text>

      <View style={[styles.grid, isWide && styles.wideGrid]}>
        {joinedEvents.length > 0 ? (
          joinedEvents.map((event) => (
            <View key={event.id} style={[styles.card, isWide && styles.wideCard]}>
              <Text style={styles.category}>{event.category}</Text>
              <Text style={styles.cardTitle}>{event.title}</Text>
              <Text style={styles.cardDetail}>{event.date} • {event.location}</Text>
              
              <Pressable
                style={styles.button}
                onPress={() => router.push(`/event/${event.id}`)}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>You haven't joined any events yet.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#334155', marginBottom: 16 },
  grid: { flexDirection: 'column', gap: 12 },
  wideGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  wideCard: { width: '48%' },
  category: { fontSize: 12, fontWeight: 'bold', color: '#2563EB', textTransform: 'uppercase', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  cardDetail: { fontSize: 14, color: '#64748B', marginTop: 4, marginBottom: 12 },
  button: { backgroundColor: '#2563EB', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
  emptyText: { color: '#94A3B8', fontStyle: 'italic' },
});