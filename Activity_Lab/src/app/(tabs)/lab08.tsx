import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const initialStudents = [
  { id: '1', name: 'Juan Dela Cruz', status: 'Absent' },
  { id: '2', name: 'Maria Clara', status: 'Absent' },
  { id: '3', name: 'Pedro Penduko', status: 'Absent' },
  { id: '4', name: 'Jose Rizal', status: 'Absent' },
  { id: '5', name: 'Andres Bonifacio', status: 'Absent' },
  { id: '6', name: 'Apolinario Mabini', status: 'Absent' },
  { id: '7', name: 'Melchora Aquino', status: 'Absent' },
  { id: '8', name: 'Gabriela Silang', status: 'Absent' },
  { id: '9', name: 'Emilio Aguinaldo', status: 'Absent' },
  { id: '10', name: 'Juan Luna', status: 'Absent' },
];

export default function Lab08() {
  const [students, setStudents] = useState(initialStudents);

  // Requirement: useState and useEffect
  useEffect(() => {
    console.log('Attendance updated:', students);
  }, [students]);

  // Compute counters
  const presentCount = students.filter((s) => s.status === 'Present').length;
  const absentCount = students.filter((s) => s.status === 'Absent').length;

  const toggleAttendance = (id: string, newStatus: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Attendance Sheet</Text>
        <Text style={styles.subtitle}>Lab 08 • Local State Tracker</Text>

        {/* Dashboard Summary Counter */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, styles.presentBg]}>
            <Text style={styles.summaryNumber}>{presentCount}</Text>
            <Text style={styles.summaryLabel}>PRESENT</Text>
          </View>
          <View style={[styles.summaryCard, styles.absentBg]}>
            <Text style={styles.summaryNumber}>{absentCount}</Text>
            <Text style={styles.summaryLabel}>ABSENT</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isPresent = item.status === 'Present';
          return (
            <View style={styles.card}>
              <View style={styles.infoContainer}>
                <Text style={styles.studentName}>{item.name}</Text>
                <View style={[styles.badge, isPresent ? styles.presentBadge : styles.absentBadge]}>
                  <Text style={[styles.badgeText, isPresent ? styles.presentBadgeText : styles.absentBadgeText]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.btn, isPresent ? styles.btnPresentActive : styles.btnInactive]}
                  onPress={() => toggleAttendance(item.id, 'Present')}
                >
                  <Text style={[styles.btnText, isPresent ? styles.btnTextActive : styles.btnTextInactive]}>
                    Present
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.btn, !isPresent ? styles.btnAbsentActive : styles.btnInactive]}
                  onPress={() => toggleAttendance(item.id, 'Absent')}
                >
                  <Text style={[styles.btnText, !isPresent ? styles.btnTextActive : styles.btnTextInactive]}>
                    Absent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  summaryCard: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  presentBg: {
    backgroundColor: '#DCFCE7',
  },
  absentBg: {
    backgroundColor: '#FEE2E2',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 2,
    color: '#475569',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  presentBadge: {
    backgroundColor: '#F0FDF4',
  },
  absentBadge: {
    backgroundColor: '#FEF2F2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  presentBadgeText: {
    color: '#16A34A',
  },
  absentBadgeText: {
    color: '#DC2626',
  },
  buttonGroup: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 4,
    borderRadius: 12,
    gap: 4,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnInactive: {
    backgroundColor: 'transparent',
  },
  btnPresentActive: {
    backgroundColor: '#22C55E',
  },
  btnAbsentActive: {
    backgroundColor: '#EF4444',
  },
  btnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  btnTextActive: {
    color: '#FFFFFF',
  },
  btnTextInactive: {
    color: '#64748B',
  },
});
