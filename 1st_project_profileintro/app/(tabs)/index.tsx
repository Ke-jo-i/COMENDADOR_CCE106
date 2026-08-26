import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.overlay}>
      <Text style={styles.appTitle}>GRASYA CARE</Text>
      <Text style={styles.studentName}>NAME: KRISTINE JOY P. COMENDADOR</Text>
      <Text style={styles.courseSection}>COURSE/SECTION: BSIT/CCE 106</Text>
      
      <Text style={styles.appIdea}>
        APP IDEA: An easy-to-use calendar alarm app for seniors that lets them set schedule reminders and plays a voice alert saying &quot;Take your medicine&quot;.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  appTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#395a68',
    marginBottom: 20,
    textAlign: 'center',
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff', 
    marginBottom: 10,
    textAlign: 'center',
  },
  courseSection: {
    fontSize: 16,
    fontWeight: '600',
    color: "#ffffff",
    marginBottom: 16,
    textAlign: 'center',
  },
  appIdea: {
    fontSize: 14,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});