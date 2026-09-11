import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

const COLORS = {
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  border: '#E2E8F0',
  success: '#16A34A',
  successBg: '#DCFCE7',
  overlay: 'rgba(15, 23, 42, 0.5)',
};

export default function App() {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 500;

  // Initial State sa Recent Activity
  const [activities, setActivities] = useState([
    { id: '1', title: 'Figma Subscription', time: 'Today, 2:15 PM', amount: -15, type: 'expense' },
    { id: '2', title: 'Client Payment', time: 'Yesterday', amount: 1200, type: 'income' },
  ]);

  // Dynamic Calculations base sa Recent Activity List
  const baseRevenue = 25000;
  const baseUsers = 1240;

  // 1. Total Revenue = Base + Sum of all activity amounts
  const currentRevenue = baseRevenue + activities.reduce((acc, item) => acc + item.amount, 0);

  // 2. Active Users = Base minus total expense actions
  const expenseCount = activities.filter((a) => a.amount < 0).length;
  const currentUsers = baseUsers - expenseCount * 2;

  // 3. Conversions = Dynamic percentage computation
  const currentConversions = (3.42 + activities.length * 0.05).toFixed(2);

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'bill' | 'send' | 'reports' | 'settings' | null
  const [titleInput, setTitleInput] = useState('');
  const [amountInput, setAmountInput] = useState('');

  // Handler: Add Bill (- Amount)
  const handleAddBill = () => {
    if (!titleInput || !amountInput || isNaN(amountInput)) {
      Alert.alert('Error', 'Palihug og sulod sa sakto nga name ug amount.');
      return;
    }
    const numAmount = parseFloat(amountInput);
    const newActivity = {
      id: Date.now().toString(),
      title: titleInput,
      time: 'Just now',
      amount: -numAmount,
      type: 'expense',
    };

    setActivities([newActivity, ...activities]);
    closeModal();
  };

  // Handler: Send Money (- Amount)
  const handleSendMoney = () => {
    if (!titleInput || !amountInput || isNaN(amountInput)) {
      Alert.alert('Error', 'Palihug og sulod sa recipient name ug amount.');
      return;
    }
    const numAmount = parseFloat(amountInput);
    const newActivity = {
      id: Date.now().toString(),
      title: `Sent to ${titleInput}`,
      time: 'Just now',
      amount: -numAmount,
      type: 'expense',
    };

    setActivities([newActivity, ...activities]);
    closeModal();
  };

  const closeModal = () => {
    setActiveModal(null);
    setTitleInput('');
    setAmountInput('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER WITH YM & SETTINGS IN A BOX */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>Overview</Text>
            <Text style={styles.screenSubtitle}>Welcome back, Yum</Text>
          </View>

          {/* Right Box containing Avatar & Settings Side by Side */}
          <View style={styles.headerControlBox}>
            <TouchableOpacity 
              style={styles.profileBtn} 
              onPress={() => Alert.alert('Profile', 'Logged in as Yum')} 
              activeOpacity={0.7}
            >
              <View style={styles.profileAvatar}>
                <Text style={styles.avatarText}>YM</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsBtn} 
              onPress={() => setActiveModal('settings')} 
              activeOpacity={0.7}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* METRIC CARDS - ALL AUTOMATICALLY COMPUTED */}
        <View style={[styles.metricsContainer, isWideScreen && styles.metricsRow]}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Total Revenue</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>Live</Text></View>
            </View>
            <Text style={styles.metricValue}>${currentRevenue.toLocaleString()}</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Active Users</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>Updated</Text></View>
            </View>
            <Text style={styles.metricValue}>{currentUsers.toLocaleString()}</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricTitle}>Conversions</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>Auto</Text></View>
            </View>
            <Text style={styles.metricValue}>{currentConversions}%</Text>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsList}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveModal('bill')} activeOpacity={0.7}>
              <View style={styles.iconCircle}><Text style={styles.iconText}>+</Text></View>
              <Text style={styles.actionText}>Add Bill</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveModal('send')} activeOpacity={0.7}>
              <View style={styles.iconCircle}><Text style={styles.iconText}>↗</Text></View>
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={() => setActiveModal('reports')} activeOpacity={0.7}>
              <View style={styles.iconCircle}><Text style={styles.iconText}>▤</Text></View>
              <Text style={styles.actionText}>Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RECENT ACTIVITY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            {activities.map((item, index) => (
              <View 
                key={item.id} 
                style={[
                  styles.activityItem, 
                  index === activities.length - 1 && { borderBottomWidth: 0 }
                ]}
              >
                <View>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
                <Text style={[
                  styles.activityAmount, 
                  { color: item.amount > 0 ? COLORS.success : COLORS.textPrimary }
                ]}>
                  {item.amount > 0 ? `+$${item.amount.toLocaleString()}` : `-$${Math.abs(item.amount).toLocaleString()}`}
                </Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* MODAL: ADD BILL & SEND MONEY */}
      <Modal visible={activeModal === 'bill' || activeModal === 'send'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {activeModal === 'bill' ? 'Add New Bill' : 'Send Money'}
            </Text>
            
            <Text style={styles.inputLabel}>
              {activeModal === 'bill' ? 'Bill Name' : 'Recipient Name'}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={activeModal === 'bill' ? 'e.g. Electric Bill' : 'e.g. John Doe'}
              value={titleInput}
              onChangeText={setTitleInput}
            />

            <Text style={styles.inputLabel}>Amount ($)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={amountInput}
              onChangeText={setAmountInput}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.submitBtn} 
                onPress={activeModal === 'bill' ? handleAddBill : handleSendMoney}
              >
                <Text style={styles.submitBtnText}>
                  {activeModal === 'bill' ? 'Add Bill' : 'Send Now'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL: REPORTS */}
      <Modal visible={activeModal === 'reports'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Financial Report Summary</Text>
            <Text style={styles.reportSubtitle}>Overview of current stats:</Text>

            <View style={styles.reportSummaryBox}>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>Calculated Revenue:</Text>
                <Text style={styles.reportValue}>${currentRevenue.toLocaleString()}</Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>Active System Users:</Text>
                <Text style={styles.reportValue}>{currentUsers}</Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>Total Transactions:</Text>
                <Text style={styles.reportValue}>{activities.length}</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.submitBtn, { width: '100%', marginTop: 12 }]} onPress={closeModal}>
              <Text style={styles.submitBtnText}>Close Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: SETTINGS */}
      <Modal visible={activeModal === 'settings'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <Text style={styles.reportSubtitle}>Preferences for Yum's Account</Text>

            <View style={styles.reportSummaryBox}>
              <Text style={styles.reportLabel}>• Theme: Light Mode</Text>
              <Text style={styles.reportLabel}>• Currency: USD ($)</Text>
              <Text style={styles.reportLabel}>• Notifications: Enabled</Text>
            </View>

            <TouchableOpacity style={[styles.submitBtn, { width: '100%', marginTop: 12 }]} onPress={closeModal}>
              <Text style={styles.submitBtnText}>Save & Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 20, gap: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  screenTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.5 },
  screenSubtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
  
  /* Header Control Box (YM Avatar & Settings together in a box) */
  headerControlBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    backgroundColor: COLORS.surface, 
    padding: 6, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  profileBtn: { padding: 2 },
  profileAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  settingsBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  settingsIcon: { fontSize: 16 },

  metricsContainer: { gap: 12 },
  metricsRow: { flexDirection: 'row' },
  metricCard: { flex: 1, backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 16, padding: 16, gap: 12, elevation: 1 },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricTitle: { fontSize: 13, fontWeight: '500', color: COLORS.textSecondary },
  badge: { backgroundColor: COLORS.successBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: COLORS.success, fontSize: 11, fontWeight: '700' },
  metricValue: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  section: { gap: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, letterSpacing: -0.3 },
  quickActionsList: { flexDirection: 'row', gap: 12 },
  actionBtn: { flex: 1, backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 16, paddingVertical: 14, alignItems: 'center', gap: 8 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  iconText: { color: COLORS.primary, fontSize: 18, fontWeight: '700' },
  actionText: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  activityCard: { backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1, borderRadius: 16, paddingHorizontal: 16 },
  activityItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  activityTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  activityTime: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  activityAmount: { fontSize: 15, fontWeight: '700' },

  /* Modal Styles */
  modalOverlay: { flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: COLORS.surface, borderRadius: 20, padding: 20, gap: 12 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary },
  inputLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, marginTop: 4 },
  textInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 15, color: COLORS.textPrimary },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 12 },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  cancelBtnText: { color: COLORS.textSecondary, fontWeight: '600' },
  submitBtn: { flex: 1, backgroundColor: COLORS.primary, padding: 14, borderRadius: 10, alignItems: 'center' },
  submitBtnText: { color: '#FFF', fontWeight: '700' },

  /* Reports & Settings Modal */
  reportSubtitle: { fontSize: 14, color: COLORS.textSecondary },
  reportSummaryBox: { backgroundColor: COLORS.bg, padding: 16, borderRadius: 12, gap: 10, marginTop: 8 },
  reportRow: { flexDirection: 'row', justifyContent: 'space-between' },
  reportLabel: { fontSize: 14, color: COLORS.textSecondary },
  reportValue: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
});