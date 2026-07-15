import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        // Don't run in local development mode
        if (__DEV__) return; 
        
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          Alert.alert(
            "Update Available", 
            "The app will now restart to apply a fast patch update.",
            [{ text: "OK", onPress: async () => await Updates.reloadAsync() }]
          );
        }
      } catch (error) {
        console.log("Error fetching latest OTA bundle: ", error);
      }
    }
    onFetchUpdateAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title} testID="app-header">
            CI/CD Verified Ecosystem
          </Text>
          
          <Text style={styles.counter} testID="counter-value">
            Current Count: {count}
          </Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.buttonText}>Increment Count</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#108529',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  counter: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});