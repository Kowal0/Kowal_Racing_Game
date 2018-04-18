import React from 'react';
import ReactDOM from 'react-dom';

import style from './scss/main.scss'


document.addEventListener("DOMContentLoaded", function(){

  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state={
        game_over: false,

        clientHeight: 0,
        clientWidth: 0,

        playerOffsetLeft: 0,
        playerOffsetTop: 0,

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
      console.log(this.state.clientWidth, this.state.playerOffsetLeft);
      if (this.state.game_over === false) {
        let key = e.keyCode;
        this.setState({

           clientHeight: document.querySelector('.road').clientHeight,
           playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
           // playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
           // carOffsetRight: document.querySelector('.car-player').offsetLeft,
           playerOffsetTop: document.querySelector('.car-player').offsetTop,
           // carOffsetBottom: document.querySelector('.car-player').offsetLeft,
        });
        if (key === 37 && this.state.move_left === false ) {
            this.setState({
              move_left: this.state.playerOffsetLeft > 10 ? requestAnimationFrame(this.left) : cancelAnimationFrame(this.state.move_left)
            })
        } else if (key === 38 && this.state.move_up === false) {
            this.setState({
              move_up: requestAnimationFrame(this.up)
            })
        } else if (key === 39 && this.state.move_right === false) {

            this.setState({
              move_right: this.state.playerOffsetLeft < this.state.clientWidth ? requestAnimationFrame(this.right) : cancelAnimationFrame(this.state.move_right)
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
            playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
            move_left: cancelAnimationFrame(this.state.move_left),
            move_left: false
          })
        } else if (key === 38  ) {
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
          playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
          move_left: this.state.playerOffsetLeft > 10 ? requestAnimationFrame(this.left) : cancelAnimationFrame(this.state.move_left)
        })
      }
    }
    right = (e) => {
      if (this.state.game_over === false) {
        this.setState({
          player_left: parseInt(this.state.player_left) + 1 + "%",
          move_right: this.state.playerOffsetLeft < this.state.clientWidth ? requestAnimationFrame(this.right) : cancelAnimationFrame(this.state.move_right)
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
      //set height and width to use for collisions
      this.setState({
        clientHeight: document.querySelector('.road').clientHeight,
        clientWidth: document.querySelector('.road').clientWidth
      })

      document.addEventListener('keydown', e => this.turn(e))
      document.addEventListener('keyup', e => this.turnStop(e))
      document.addEventListener('load', this.animateBackground());

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
