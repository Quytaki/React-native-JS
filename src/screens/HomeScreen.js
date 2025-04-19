import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng bạn đã đăng nhập! 🎉</Text>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(logoutUser())}>
        <Text style={styles.buttonText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#00ADB5',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#393E46',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#EEEEEE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
