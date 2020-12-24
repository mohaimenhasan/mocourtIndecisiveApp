import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Alert, Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  
  let pic = {
    uri: 'https://yesno.wtf/assets/yes/12-e4f57c8f172c51fdd983c2837349f853.gif'
    };
  return (
    <View style={styles.container}>
      <Text>Ask me a question and tap the button below.</Text>
      <Button
        onPress={() => {
            Alert.alert('Yes!');
        }}
        title="Tap Me"
        style={styles.button}
        />
       <Image source={pic} style={{width: 193, height: 110}}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },
  button: {
  width: 260,
  alignItems: 'center',
  backgroundColor: '#2196F3'
  },
  image: {
  width: 193,
  height: 110
  }
});
