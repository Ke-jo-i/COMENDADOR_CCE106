import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function App() {
  const student = {
    name: 'Zetzy Fruitzy Comzy',
    program: 'BS Information Technology',
    email: 'Zetzycomzy@example.com',
    // Using a reliable public avatar placeholder
    avatar: 'https://avatar.iran.liara.run/public/boy',
  };

  const [taskTitle, setTaskTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([
    { id: '1', title: 'Review React Native Components', dueDate: '2025-05-30', completed: false },
    { id: '2', title: 'Finish Mini Project UI', dueDate: '2025-05-18', completed: false },
    { id: '3', title: 'Study for Exam', dueDate: '2025-05-22', completed: false },
    { id: '4', title: 'Exercise', dueDate: '2025-05-17', completed: true },
    { id: '5', title: 'Read Documentation', dueDate: '2025-05-05', completed: true },
  ]);

  const handleAddTask = () => {
    if (!taskTitle.trim() || !dueDate.trim()) {
      Alert.alert('Validation Error', 'Please provide both a task title and a due date.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTaskList([newTask, ...taskList]);
    setTaskTitle('');
    setDueDate('');
  };

  const handleToggleTask = (id: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    if (Platform.OS === 'web') {
      if (confirm('Are you sure you want to delete this task?')) {
        setTaskList((prev) => prev.filter((task) => task.id !== id));
      }
    } else {
      Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTaskList((prev) => prev.filter((task) => task.id !== id)),
        },
      ]);
    }
  };

  const pendingCount = taskList.filter((t) => !t.completed).length;
  const completedCount = taskList.filter((t) => t.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Tasks</Text>
          <Text style={styles.headerSubtitle}>Stay organized and get things done!</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: student.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentDetails}>{student.program}</Text>
            <Text style={styles.studentDetails}>{student.email}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending Tasks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed Tasks</Text>
          </View>
        </View>

        {/* Input Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Add New Task</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Task Title"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Due date (YYYY-MM-DD)"
            value={dueDate}
            onChangeText={setDueDate}
          />

          <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>+ Add Task</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>My Task List</Text>
          {taskList.map((item) => (
            <View key={item.id} style={styles.taskCard}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleToggleTask(item.id)}
              >
                <View style={[styles.circle, item.completed && styles.circleCompleted]} />
              </TouchableOpacity>

              <View style={styles.taskTextContainer}>
                <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
                  {item.title}
                </Text>
                <Text style={styles.taskDueDate}>{item.dueDate}</Text>
              </View>

              <TouchableOpacity onPress={() => handleDeleteTask(item.id)} activeOpacity={0.6}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CBD5E1',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  studentDetails: {
    fontSize: 12,
    color: '#64748B',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 0.48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listSection: {
    marginBottom: 20,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  checkbox: {
    marginRight: 12,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#94A3B8',
  },
  circleCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E293B',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskDueDate: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  deleteIcon: {
    fontSize: 14,
    padding: 4,
  },
});