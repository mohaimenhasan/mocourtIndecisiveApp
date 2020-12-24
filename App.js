import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Alert, Image, StyleSheet, Text, View } from 'react-native';

let api ='https://yesno.wtf/api/';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      answer: "",
      image: "",
    }
  } 
  
  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
        throw Error(response.statusText);
        }
        const json = await response.json();
        this.setState({
        answer: json.answer,
        image: json.image,
        });
    } catch (error) {
        console.log(error);
    }
}


  render(){
    return (
      <View style={styles.container}>
        <Text>Ask me a question and tap the button below.</Text>
        <Button
          onPress={() => {
          this.fetchData();
          }}
          title="Tap Me"
          style={styles.button}
        />
        <Text style={styles.answer}>{this.state.answer}</Text>
        <Image source={{uri:this.state.image}} style={styles.image}>
        </Image>
        </View>
    );
  }
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
  },
  answer: {
    textAlign: 'center',
    color: 'white',
    fontSize: 32,
    textTransform: 'uppercase'
    },
});
