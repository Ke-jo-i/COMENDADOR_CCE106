import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CalculatorScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<string | number>('0');

  const calculate = (operator: string) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult('Invalid Input');
      return;
    }

    switch (operator) {
      case '+': setResult(n1 + n2); break;
      case '-': setResult(n1 - n2); break;
      case '*': setResult(n1 * n2); break;
      case '/': setResult(n2 !== 0 ? n1 / n2 : 'Cannot divide by 0'); break;
    }
  };

  const clear = () => {
    setNum1('');
    setNum2('');
    setResult('0');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Calculator</Text>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => calculate('+')}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => calculate('-')}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => calculate('*')}>
          <Text style={styles.btnText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => calculate('/')}>
          <Text style={styles.btnText}>÷</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.clearBtn} onPress={clear}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#121212' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 20 },
  resultContainer: { backgroundColor: '#1e1e1e', padding: 20, borderRadius: 10, marginBottom: 20, alignItems: 'flex-end' },
  resultText: { fontSize: 32, fontWeight: 'bold', color: '#4caf50' },
  input: { backgroundColor: '#1e1e1e', color: '#fff', padding: 15, borderRadius: 10, fontSize: 18, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  btn: { backgroundColor: '#2196f3', flex: 1, marginHorizontal: 5, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  clearBtn: { backgroundColor: '#f44336', padding: 15, borderRadius: 10, alignItems: 'center' },
  clearText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});