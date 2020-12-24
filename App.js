import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, TouchableOpacity , Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

let api ='https://yesno.wtf/api/';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      answer: "",
      image: "",
      title: true,
      buttonText: "Yes or No?"
    }
  } 
  
  async componentDidMount() {
    this.setState({
        isLoading: false,
    });
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
          isLoading: false,
          answer: json.answer,
          image: json.image,
          title: false,
          buttonText: "Just Do It"
        });
    } catch (error) {
        console.log(error);
    }
}


  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
            <ActivityIndicator/>
        </View>
        )
    }
    return (
      <View style={styles.container}>
          { this.state.title ?
            <Text style={styles.header}>Ask me a question and tap the button below.</Text> : 
            <Text style={styles.header}>Keep on asking me questions.</Text>
          }
          <TouchableOpacity 
            onPress={() => {this.fetchData();}}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.buttonText}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.answer}>{this.state.answer}</Text>
          <Image 
            source=
              {
                this.state.image ? { uri:this.state.image } : null 
              } 
            style={styles.image}
          >
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
    height: imageHeight,
    width: imageWidth,
  },
  answer: {
    textAlign: 'center',
    color: 'white',
    fontSize: 32,
    textTransform: 'uppercase'
    },
  header: {
    textAlign: 'center',
    fontSize: 32,
    padding: 30,
    },
  buttonText: {
    padding: 20,
    color: 'white',
    textTransform: 'uppercase'
  }
});
