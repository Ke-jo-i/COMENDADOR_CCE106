import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Validate route parameter
  const isInvalid = !id || id === 'invalid' || isNaN(Number(id));

  return (
    <View style={styles.container}>
      {isInvalid ? (
        <>
          <Text style={styles.errorText}>Error: Invalid Student ID!</Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Student Profile</Text>
          <Text style={styles.detail}>Displaying details for Student ID: {id}</Text>
          <Button title="Back to Home" onPress={() => router.back()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  detail: { fontSize: 18, marginBottom: 20 },
  errorText: { fontSize: 20, color: 'red', marginBottom: 20, fontWeight: 'bold' }
});