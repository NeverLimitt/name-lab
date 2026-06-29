import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const generateIdeas = () => {
    if (!keyword) {
      Alert.alert("Oops!", "Masukkan kata kunci dulu ya untuk mulai.");
      return;
    }
    
    const input = keyword.toLowerCase();
    const suffixes = ['ify', 'verse', 'lab', 'hub', 'core', 'ops', 'side', 'mode', 'pro', 'ly', 'io', 'flow', 'grid', 'base', 'lytics', 'sync', 'nect', 'peak', 'hive', 'craft', 'pulse'];
    const prefixes = ['get', 'the', 'pro', 'my', 'up', 'sync', 'mega', 'ultra', 'omni', 'cyber', 'neo', 'prime', 'go', 'pure'];
    const endings = ['y', 'er', 'a', 'ia', 'ix', 'ex', 'o'];

    let suggestions = [
      ...suffixes.map(s => `${input}${s}`), 
      ...prefixes.map(p => `${p}${input}`),
      ...endings.map(e => `${input}${e}`),
      `${input}z`, `${input}x`, `${input}stack`, `${input}wise`
    ];

    for (let i = suggestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [suggestions[i], suggestions[j]] = [suggestions[j], suggestions[i]];
    }

    setResults(suggestions.slice(0, 50).map((name, i) => ({ id: i, name })));
  };

  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter(item => item !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.hero}>
          <Text style={styles.title}>Name<Text style={{color: '#a78bfa'}}>Lab</Text></Text>
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput 
            style={styles.input} 
            placeholder="Ketik kata kunci..." 
            placeholderTextColor="#64748b"
            value={keyword}
            onChangeText={setKeyword}
          />
          <TouchableOpacity style={styles.refreshButton} onPress={generateIdeas}>
            <Ionicons name="refresh" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={generateIdeas}>
            <Text style={styles.buttonText}>Generate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chipContainer}>
          {results.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.chip, favorites.includes(item.name) && styles.chipActive]} 
              onPress={() => toggleFavorite(item.name)}
            >
              <Text style={styles.chipText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>NameLab © 2026 • AI-Powered Branding</Text>
        <Text style={styles.footerSub}>Dibuat untuk kreativitas tanpa batas.</Text>
      </View>

      {favorites.length > 0 && (
        <View style={styles.favPanel}>
          <Text style={styles.favTitle}>Favorit ({favorites.length})</Text>
          <Text style={styles.favList}>{favorites.join(', ')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  wrapper: { padding: 20 },
  hero: { marginTop: 40, marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 40, fontWeight: '900', color: '#fff' },
  inputGroup: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#0f172a', color: '#fff', padding: 12, borderRadius: 8 },
  refreshButton: { backgroundColor: '#334155', padding: 12, borderRadius: 8, justifyContent: 'center' },
  button: { backgroundColor: '#4f46e5', paddingHorizontal: 20, borderRadius: 8, justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#334155' },
  chipActive: { backgroundColor: '#15803d', borderColor: '#22c55e' },
  chipText: { color: '#cbd5e1', fontSize: 13 },
  footer: { padding: 20, alignItems: 'center', borderTopWidth: 1, borderColor: '#1e293b', backgroundColor: '#020617' },
  footerText: { color: '#475569', fontSize: 12, fontWeight: '600' },
  footerSub: { color: '#334155', fontSize: 10, marginTop: 4 },
  favPanel: { backgroundColor: '#0f172a', padding: 15, borderTopWidth: 1, borderColor: '#334155' },
  favTitle: { color: '#a78bfa', fontWeight: 'bold', marginBottom: 5 },
  favList: { color: '#fff', fontSize: 12 }
});
