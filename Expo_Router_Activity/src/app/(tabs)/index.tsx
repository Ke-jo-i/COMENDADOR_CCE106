import { View, Text, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      {/* Link Component */}
      <Link href={"/user/101" as any} style={styles.link}>
        Go to Student #101 (via Link)
      </Link>

      {/* Programmatic Navigation */}
      <Button 
        title="Go to Student #202 (via Router)" 
        onPress={() => router.push("/user/202" as any)} 
      />

      {/* Invalid Parameter Test */}
      <View style={{ marginTop: 10 }}>
        <Button 
          title="Test Invalid Student" 
          color="red"
          onPress={() => router.push("/user/invalid" as any)} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 },
  title: { fontSize: 24, fontWeight: 'bold' },
  link: { fontSize: 18, color: 'blue', textDecorationLine: 'underline' }
});