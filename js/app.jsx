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

        clientHeight: 0,

        move_right: false,
        move_left: false,
        move_up: false,
        move_down: false,

        player_left: "44%",
        player_bottom: "2%",

        stripe_on: true,

        stripe1: "-150px",
        stripe2: "150px",
        stripe3: "450px"
      }
    }

    animateBackground = () => {
      if (this.state.game_over === false) {
        this.setState({
          stripe_on: requestAnimationFrame(this.animateBackground),
          stripe1: parseInt(this.state.stripe1) + 3 + "px",
          stripe2: parseInt(this.state.stripe2) + 3 + "px",
          stripe3: parseInt(this.state.stripe3) + 3 + "px",
        })
      }
    }


    //moving player
    turn = (e) => {
      if (this.state.game_over === false) {
        let key = e.keyCode;
        if (key === 37 && this.state.move_left === false) {
            this.setState({
              move_left: requestAnimationFrame(this.left)
            })
        } else if (key === 38 && this.state.move_up === false) {
            this.setState({
              move_up: requestAnimationFrame(this.up)
            })
        } else if (key === 39 && this.state.move_right === false) {
            this.setState({
              move_right: requestAnimationFrame(this.right)
            })
        } else if (key === 40 && this.state.move_down === false) {
            this.setState({
              move_down: requestAnimationFrame(this.down)
            })
          }
        }
      }
      turnStop = (e) => {
        if (this.state.game_over === false) {
        let key = e.keyCode;
        if (key === 37) {
          this.setState({
            move_left: cancelAnimationFrame(this.state.move_left),
            move_left: false
          })
        } else if (key === 38) {
          this.setState({
            move_up: cancelAnimationFrame(this.state.move_up),
            move_up: false
          })
        } else if (key === 39) {
          this.setState({
            move_right: cancelAnimationFrame(this.state.move_right),
            move_right: false
          })
        } else if (key === 40) {
          this.setState({
            move_down: cancelAnimationFrame(this.state.move_down),
            move_down: false
          })
      }
    }
  }

    left = (e) => {
      if (this.state.game_over === false) {
        this.setState({
          player_left: parseInt(this.state.player_left) - 1 + "%",
          move_left: requestAnimationFrame(this.left)
        })
      }
    }
    right = (e) => {
      if (this.state.game_over === false) {
        this.setState({
          player_left: parseInt(this.state.player_left) + 1 + "%",
          move_right: requestAnimationFrame(this.right)
        })
      }
    }
    up = (e) => {
      if (this.state.game_over === false) {
        this.setState({
          player_bottom: parseInt(this.state.player_bottom) + 1 + "%",
          move_up: requestAnimationFrame(this.up)
        })
      }
    }
    down = (e) => {
      if (this.state.game_over === false) {
        this.setState({
          player_bottom: parseInt(this.state.player_bottom) - 1 + "%",
          move_down: requestAnimationFrame(this.down)
        })
      }
    }
    componentDidMount(){
      document.addEventListener('keydown', e => this.turn(e))
      document.addEventListener('keyup', e => this.turnStop(e))
      document.addEventListener('load', this.animateBackground());

      const height = document.querySelector('.road').clientHeight;
      this.setState({ clientHeight: this.height });
      console.log(height); //set state jest asynchroniczny, dlatego nie lapie heigh
    }
     render() {
       return (
         <div className="road" >
           <div className="stripe stripe-l" style={{top:this.state.stripe1}}></div>
           <div className="stripe stripe-l" style={{top:this.state.stripe2}}></div>
           <div className="stripe stripe-l" style={{top:this.state.stripe3}}></div>
           <div className="stripe stripe-r" style={{top:this.state.stripe1}}></div>
           <div className="stripe stripe-r" style={{top:this.state.stripe2}}></div>
           <div className="stripe stripe-r" style={{top:this.state.stripe3}}></div>
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
