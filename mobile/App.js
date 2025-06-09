import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const db = SQLite.openDatabase('offline.db');

export default function App() {
  const [hasPerm, setPerm] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) =>
      setPerm(status === 'granted')
    );

    db.transaction(tx =>
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS queue (id INTEGER PRIMARY KEY AUTOINCREMENT, payload TEXT)'
      )
    );
  }, []);

  const queueScan = (data) => {
    const payload = JSON.stringify({
      barcode: data,
      ts: Date.now(),
      result: 'PASS',
    });
    db.transaction(tx =>
      tx.executeSql('INSERT INTO queue (payload) VALUES (?)', [payload])
    );
  };

  const trySync = useCallback(() => {
    db.transaction(tx =>
      tx.executeSql('SELECT * FROM queue', [], async (_, { rows }) => {
        for (const row of rows._array) {
          try {
            await axios.post('http://localhost:3000/sync', JSON.parse(row.payload));
            db.transaction(tx2 =>
              tx2.executeSql('DELETE FROM queue WHERE id = ?', [row.id])
            );
          } catch (e) {
            console.log('Sync failed, will retry later');
          }
        }
      })
    );
  }, []);

  useEffect(() => {
    const id = setInterval(trySync, 5000);
    return () => clearInterval(id);
  }, [trySync]);

  if (hasPerm === null) {
    return <Text>Requesting camera permission…</Text>;
  }
  if (hasPerm === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    queueScan(data);
    Alert.alert('Scan stored', `Barcode ${data} queued for sync.`);
    setTimeout(() => setScanned(false), 500);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
