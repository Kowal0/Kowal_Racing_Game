import React from 'react';
import ReactDOM from 'react-dom';

import style from './scss/main.scss'


document.addEventListener("DOMContentLoaded", function(){

  // class Cars extends React.Component {
  //    constructor(props){
  //      super(props);
  //
  //    }
  //    render() {
  //      return (
         //enclosing tag to powinien byc board
         // <div className="car car-player"></div>
         // <div className="car car-1"></div>
         // <div className="car car-2"></div>
         // <div className="car car-3"></div>
         /* <div className="car car-4"></div>
         <div className="car car-5"></div>
         <div className="car car-6"></div> */
   //     )
   //   }
   // }

  // class Board extends React.Component {
     // constructor(props){
     //   super(props);
     //   this.state={
     //     game_over: false,
     //
     //     move_right: false,
     //     move_left: false,
     //     move_up: false,
     //     move_down: false,
     //
     //     player_left: "44%",
     //     player_bottom: "2%",
     //   }
     // }
     // //czy mozna dodac event keydown do document
     // //czy zeby manipulowac pozycja diva na keydown potrzebuje referencji
     // turnLeft = e => {
     //   if (this.state.game_over === false) {
     //     let key = e.keyCode;
     //     if (key === 37 && this.state.move_left === false) {
     //       console.log(key);
     //       console.log(e);
     //
     //       this.setState({
     //         move_left: requestAnimationFrame(this.left)
     //       })
     //     }
     //   }
     // }
     // left = e => {
     //   if (this.state.game_over === false) {
     //     console.log(e);
     //     this.setState({
     //       player_left: Number(this.state.player_left) - 1 + "%"
     //     })
     //   }
     // }
     // render() {
       // console.log(this.state);
       // console.log(this.left);
       // console.log(this.turnLeft);
       // return (

         // <div className="road">
         //   <div className="stripe stripe-l stripe1"></div>
         //   <div className="stripe stripe-l stripe2"></div>
         //   <div className="stripe stripe-l stripe3"></div>
         //   <div className="stripe stripe-r stripe1"></div>
         //   <div className="stripe stripe-r stripe2"></div>
         //   <div className="stripe stripe-r stripe3"></div>
         //   <div className="car car-player" style={{left:this.state.player_left, bottom:this.state.player_bottom}}></div>
         //   <div className="car car-1"></div>
         //   <div className="car car-2"></div>
         //   <div className="car car-3"></div>
         // </div>
   //     )
   //   }
   // }

  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state={
        game_over: false,

        move_right: false,
        move_left: false,
        move_up: false,
        move_down: false,

        player_left: "44%",
        player_bottom: "2%",
      }
    }
    //czy mozna dodac event keydown do document
    //czy zeby manipulowac pozycja diva na keydown potrzebuje referencji
    turnLeft = (e) => {
      if (this.state.game_over === false) {
        let key = e.keyCode;
        if (key === 37 && this.state.move_left === false) {
          console.log(key);
          console.log(e);

          this.setState({
            move_left: requestAnimationFrame(this.left)
          })
        }
      }
    }
    turnLeftStop = (e) => {
      if (this.state.game_over === false) {
        let key = e.keyCode;
        if (key === 37) {
          this.setState({
            move_left: cancelAnimationFrame(this.state.move_left),
            move_left: false
          })
        }
      }
    }
    left = (e) => {
      if (this.state.game_over === false) {
        console.log(e);
        this.setState({
          player_left: parseInt(this.state.player_left) - 1 + "%",
          move_left: requestAnimationFrame(this.left)
        })
        console.log(this.state.player_left);
      }
    }
    componentDidMount(){
      document.addEventListener('keydown', e => this.turnLeft(e))
      document.addEventListener('keyup', e => this.turnLeftStop(e))
    }
     render() {
       // console.log(this.turnLeft);
       // document.addEventListener('keydown', function(e) {
       //   console.log(turn);
       //   turnLeft(e)
       // });
       return (
         <div className="road" >
           <div className="stripe stripe-l stripe1"></div>
           <div className="stripe stripe-l stripe2"></div>
           <div className="stripe stripe-l stripe3"></div>
           <div className="stripe stripe-r stripe1"></div>
           <div className="stripe stripe-r stripe2"></div>
           <div className="stripe stripe-r stripe3"></div>
           <div className="car car-player" style={{left:this.state.player_left, bottom:this.state.player_bottom}}></div>
           <div className="car car-1"></div>
           <div className="car car-2"></div>
           <div className="car car-3"></div>
         </div>
       )
     }
   }


  ReactDOM.render(
      <Game />,
      document.getElementById('app')
  );
});
