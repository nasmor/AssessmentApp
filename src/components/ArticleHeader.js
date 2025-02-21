import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const ArticleHeader = ({activeToggle, setActiveToggle}) => {
  const handleToggle = toggleName => {
    setActiveToggle(prev => (prev === toggleName ? null : toggleName));
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Articles</Text>

      <View style={styles.toggleContainer}>
        {['modal', 'carousel'].map(toggleName => (
          <View key={toggleName} style={styles.toggleRow}>
            <Text style={styles.toggleText}>
              {toggleName.charAt(0).toUpperCase() + toggleName.slice(1)} View
            </Text>
            <Switch
              value={activeToggle === toggleName}
              onValueChange={() => handleToggle(toggleName)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#1B4242',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  toggleContainer: {
    marginTop: 10,
    width: '100%',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  toggleText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ArticleHeader;
