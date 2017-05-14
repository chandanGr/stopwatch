//import libraries
import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
var formatTime = require("minutes-seconds-milliseconds");

//Create a Component
class stopWatch extends Component{
  constructor(){
    super();
      this.state = {
        timeElapsed : null,
        running : false,
        startTime : null,
        laps : [], 
     };
  }
  render(){
    return (
      <View style = {[style.container ]}>
        <View style = {[style.container ]}>
          <View style = {[style.timeWrapper]}>
            <Text style = {style.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style = {[ style.buttonWrapper]}>
            {this.startButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style = {style.footer}>
          {this.laps()}
        </View>
      </View>
        
    );
  }
  laps() {
    return this.state.laps.map(function(time, index){
      return 
        <View style = {style.lap}>
          <Text style = {style.lapText}>
            Lap # {index + 1}
          </Text>
          <Text style = {style.lapText}>
            {formatTime(time)}
          </Text>
        </View>
      
    });
  }
  startButton() {
    var styles = this.state.running ? style.stopButton : style.startButton;
    return (
      <TouchableHighlight underlayColor = 'gray' style = {[style.button, styles]} onPress = {this.handleStartPress.bind(this)} >        
            <Text>
              {this.state.running ? 'Stop' : 'Start'}
            </Text>
      </TouchableHighlight>
    );
  }
  handleLapPress() {
    var lap = this.state.timeElapsed;

    this.setState({
      startTime : new Date(),
      laps : this.state.laps.concat([lap])
    });
  }
  handleStartPress() {
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running : false});
      return
    }

    this.setState({startTime : new Date()});
    
    this.interval = setInterval(() =>{
      this.setState({
        timeElapsed : new Date() - this.state.startTime,
        running : true
    });
    }, 80);
  }
  lapButton() {
    return (
      <TouchableHighlight underlayColor = 'gray' style = {style.button} onPress = {this.handleLapPress.bind(this)}>
          <Text>
           Lap
          </Text>
      </TouchableHighlight>
    );
  }
  border(color) {
    return {
      borderColor : color,
      borderWidth : 4 
    }
  }
  
}

var style = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'stretch'
  },
  header : {
    flex : 1,
  },
  footer : {
    flex : 1
  },
  timeWrapper : {
    flex : 5,
    alignItems : 'center',
    justifyContent : 'center'
  },
  buttonWrapper : {
    flex : 3,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around'
  },
  timer : {
    fontSize : 60,
    color : 'rgba(0, 0, 0, .6)'
  },
  button : {
    borderWidth : 2,
    height : 100,
    width : 100,
    borderRadius : 30,
    alignItems : 'center',
    justifyContent : 'center'
  },
  startButton : {
    borderColor : '#00CC00',
    backgroundColor : 'gray',
  },
  stopButton : {
    borderColor : 'red',
    backgroundColor : 'gray',
  },
  lap : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around'
  },
  lapText : {
    fontSize : 30
  }
});

//show the component 
AppRegistry.registerComponent('stopWatch', () => stopWatch);
