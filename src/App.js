import React, { Component } from 'react';
import Particles from 'react-particles-js';
import numeral from "numeral";
import InputFields from './Components/InputFields';
import BMIResult from './Components/BMIResult';
import BmiWiki from './Components/BmiWiki';
import './styles/main/App.css';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Menu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

const particlesOptions = {
  //customize this to your liking
  particles: {
      number: {
          value: 300,
          density: {
              enable: true
          }
      },
      size: {
          value: 2,
          random: true,
          anim: {
              speed: 2,
              size_min: 0.4
          }
      },
      line_linked: {
          enable: false
      },
      move: {
          random: true,
          speed: 1,
          direction: "top",
          out_mode: "out"
      }
  },
  interactivity: {
      events: {
          onhover: {
              enable: true,
              mode: "bubble"
          },
          onclick: {
              enable: true,
              mode: "repulse"
          }
      },
      modes: {
          bubble: {
              distance: 400,
              duration: 1.5,
              size: 0,
              opacity: 0
          },
          repulse: {
              distance: 400,
              duration: 1.5
          }
      }
  }
}

const style={
    position: 'fixed',
    top: '20px',
    right: '12px',
    zIndex: '99'
} 

const vibratePattern007 = [200,100,200];
class App extends Component {
  constructor(){
    super();
    this.state = {
      navOpen: false,      
      BmiWikiOpen: false, 
      resultBoxShow: false,
      bmiInfo: { }
    }
    this.setHeightFt = this.setHeightFt.bind(this);
    this.setHeightIn = this.setHeightIn.bind(this);
    this.setWeight = this.setWeight.bind(this);
    this.generateBMI = this.generateBMI.bind(this);
  }
  setWeight(e){
    this.setState({weight: e.target.value});
  }
  setHeightFt(e){
    this.setState({heightFt: (e.target.value)});
  }
  setHeightIn(e){
    this.setState({heightIn: (e.target.value)});
  }

  handleNavToggle = () => this.setState({navOpen: !this.state.navOpen});
  handleNavClose = () => this.setState({navOpen: false});

  openBmiWiki = () => {
    this.setState({navOpen: false,BmiWikiOpen: true});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <FloatingActionButton onClick={this.handleNavToggle} style={style}><Menu /></FloatingActionButton>
        <Drawer 
            docked={false}
            width={240}
            containerClassName="drawer"
            openSecondary={true}
            open={this.state.navOpen}
            onRequestChange={(open) => this.setState({navOpen: open})}
        >
          <IconButton onClick={this.handleNavClose}><Close /></IconButton>
          <MenuItem style={{textAlign: 'left'}} onClick={this.openBmiWiki}>What is BMI ?</MenuItem>
       
        </Drawer>

        <div className="wrapper">
          <div className="bmi-container">

            <h2>BMI Calculator</h2>
            <h3>Enter - Height (Feet, Inch) and Weight (kg)</h3>
            <div className="hr"></div>
            <InputFields 
              onWeightChange={this.setWeight}
              onHeightChangeFt={this.setHeightFt}
              onHeightChangeIn={this.setHeightIn}
              generateBMI={this.generateBMI}
            />
            <BmiWiki 
              open={this.state.BmiWikiOpen} 
              close={() => {this.setState({BmiWikiOpen: false})}}
            />
            
          </div>
          
          <BMIResult 
            resultBoxShow={this.state.resultBoxShow}
            backgroundColor={this.state.bmiInfo.resultColor}
            condition={this.state.bmiInfo.condition}
            bmi={this.state.bmi}
          />
        </div>


      </div>
    );
  }


  generateBMI(){
    window.navigator.vibrate(vibratePattern007);
    
    const { weight, heightFt, heightIn } = this.state;

    let INCHES_IN_FEET = 12;

      var height = Number(heightFt);
          // convert feet to inches
          height *= INCHES_IN_FEET;
          // convert inches to cms
          height += Number(heightIn);

          height *= 2.54;

    let bmi = weight / (height * height) * 10000;
    bmi = numeral(bmi).format('(0.0)');
    this.setState({
      bmi: bmi,
      bmiInfo: this.getCondition(bmi)},
      () => {(this.state.bmiInfo.vibration) ? window.navigator.vibrate(vibratePattern007) : window.navigator.vibrate(0);
    });
    if(this.state.resultBoxShow === false){
      this.setState({resultBoxShow: true});
    }
  }

  getCondition = (bmi) => {
    if(bmi < 15){
      return {resultColor: "#FFEE58", condition: "Very severely underweight", vibration: true}
    } else if (bmi >= 15 && bmi <= 15.9) {
      return {resultColor: "#FFEE58", condition: "Severely underweight", vibration: true};
    } else if (bmi >= 16 && bmi < 18.5) {
      return {resultColor: "#FFEB3B", condition: "Underweight", vibration: true};
    } else if (bmi >= 18.5 && bmi < 25){
      return {resultColor: "#66BB6A", condition: "Normal (Healthy weight)", vibration: false};
    } else if (bmi >= 25 && bmi < 30) {
      return {resultColor: "#EF5350", condition: "Overweight", vibration: true};
    } else if (bmi >= 30 && bmi < 35){
      return {resultColor: "#E53935", condition: "Moderately obese", vibration: true};
    } else if (bmi >= 35 && bmi < 40) {
      return {resultColor: "#D84315", condition: "Severely obese", vibration: true}
    } else {
      return {resultColor: "#C62828", condition: "Very severely obese", vibration: true}
    }
  }
}

export default App;
