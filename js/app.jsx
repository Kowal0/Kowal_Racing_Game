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

        playerOffsetLeft: null,
        playerOffsetTop: null,

        move_right: false,
        move_left: false,
        move_up: false,
        move_down: false,

        player_left: "44%",
        player_bottom: "2%",
        player_rotate: "rotate(180deg)",

        stripe_on: true,

        stripe1: "-150px",
        stripe2: "150px",
        stripe3: "450px",
        stripe4: "750px",

        car1: "-100px",
        car1OffsetLeft: null,
        // car1OffsetTop: 0,
        car2: "-200px",
        car2OffsetLeft: null,
        car3: "-350px",
        car3OffsetLeft: null,
      }
    }

    //car collisions
    carCollide = () => {
      this.playerYTop = this.state.playerOffsetTop;
      this.playerYBottom = this.state.playerOffsetTop + 173;
      this.playerXLeft = this.state.playerOffsetLeft;
      this.playerXRight = this.state.playerOffsetLeft + 89;

      this.car1YTop = parseInt(this.state.car1);
      this.car1YBottom = parseInt(this.state.car1) + 173;
      this.car1XLeft = this.state.car1OffsetLeft;
      this.car1XRight = this.state.car1OffsetLeft + 89;

      if (((this.playerYBottom >= this.car1YTop && this.playerYBottom <= this.car1YBottom) ||
      (this.playerYTop <= this.car1YBottom && this.playerYTop >= this.car1YTop)) &&
      ((this.playerXLeft <= this.car1XRight && this.playerXLeft >= this.car1XLeft) ||
      (this.playerXRight >= this.car1XLeft && this.playerXRight <= this.car1XRight))) {

          console.log("jeb");
          this.setState({
            game_over: true
          })
      }
    }

    //background
    animateBackground = () => {
      // this.carCollide();
      if (this.state.game_over === false) {
        this.setState({
          stripe_on: requestAnimationFrame(this.animateBackground),

          stripe1: (parseInt(this.state.stripe1) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe1) + 10 + "px" : "-150px",
          stripe2: (parseInt(this.state.stripe2) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe2) + 10 + "px" : "-150px",
          stripe3: (parseInt(this.state.stripe3) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe3) + 10 + "px" : "-150px",
          stripe4: (parseInt(this.state.stripe4) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe4) + 10 + "px" : "-150px",

          car1OffsetLeft: document.querySelector('.car-1').offsetLeft,
          // car1OffsetTop: document.querySelector('.car-1').offsetTop,
          car2OffsetLeft: document.querySelector('.car-2').offsetLeft,
          car3OffsetLeft: document.querySelector('.car-3').offsetLeft,

          car1: (parseInt(this.state.car1) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car1) + 8 + "px" : "-100px",
          car2: (parseInt(this.state.car2) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car2) + 8 + "px" : "-150px",
          car3: (parseInt(this.state.car3) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car3) + 8 + "px" : "-200px",

        })
        this.carCollide();
      }
    }


    //moving player
    turn = (e) => {
      // console.log(document.querySelector('.road').getBoundingClientRect(), this.state.playerOffsetLeft);
      // console.log(this.state.clientWidth);
      if (this.state.game_over === false) {
        let key = e.keyCode;
        this.setState({

           playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
           playerOffsetTop: document.querySelector('.car-player').offsetTop,
           // carOffsetBottom: document.querySelector('.car-player').offsetLeft,
        });
        if (key === 37 && this.state.move_left === false ) {
            this.setState({
              move_left: this.state.playerOffsetLeft > 10 ? requestAnimationFrame(this.left) : cancelAnimationFrame(this.state.move_left)
            })
        } else if (key === 38 && this.state.move_up === false) {
            this.setState({
              move_up: this.state.playerOffsetTop > 10 ? requestAnimationFrame(this.up) : cancelAnimationFrame(this.state.move_up)
            })
        } else if (key === 39 && this.state.move_right === false) {
            this.setState({
              move_right: this.state.playerOffsetLeft  <  parseInt(this.state.clientWidth) - 99 ? requestAnimationFrame(this.right) : cancelAnimationFrame(this.state.move_right)
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
            player_rotate: "rotate(180deg)",
            playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
            move_left: cancelAnimationFrame(this.state.move_left),
            move_left: false
          })
        } else if (key === 38  ) {
          this.setState({
            playerOffsetTop: document.querySelector('.car-player').offsetTop,
            move_up: cancelAnimationFrame(this.state.move_up),
            move_up: false
          })
        } else if (key === 39) {
          this.setState({
            player_rotate: "rotate(180deg)",
            playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
            move_right: cancelAnimationFrame(this.state.move_right),
            move_right: false
          })
        } else if (key === 40) {
          this.setState({
            playerOffsetTop: document.querySelector('.car-player').offsetTop,
            move_down: cancelAnimationFrame(this.state.move_down),
            move_down: false
          })
      }
    }
  }

    left = (e) => {
      if (this.state.game_over === false) {
        this.carCollide();
        this.setState({
          player_rotate: "rotate(173deg)",
          player_left: parseInt(this.state.player_left) - 1 + "%",
          playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
          move_left: this.state.playerOffsetLeft > 10 ? requestAnimationFrame(this.left) : cancelAnimationFrame(this.state.move_left)
        })
      }
    }
    right = (e) => {
      if (this.state.game_over === false) {
        this.carCollide();
        this.setState({
          player_rotate: "rotate(187deg)",
          player_left: parseInt(this.state.player_left) + 1 + "%",
          playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
          move_right: this.state.playerOffsetLeft  <  parseInt(this.state.clientWidth) - 99 ? requestAnimationFrame(this.right) : cancelAnimationFrame(this.state.move_right)
        })
      }
    }
    up = (e) => {
      this.carCollide();
      if (this.state.game_over === false) {
        this.carCollide();
        this.setState({
          player_bottom: parseInt(this.state.player_bottom) + 1 + "%",
          playerOffsetTop: document.querySelector('.car-player').offsetTop,
          move_up: this.state.playerOffsetTop > 10 ? requestAnimationFrame(this.up) : cancelAnimationFrame(this.state.move_up)
        })
      }
    }
    down = (e) => {
      this.carCollide();
      if (this.state.game_over === false) {
        this.setState({
          player_bottom: parseInt(this.state.player_bottom) - 1 + "%",
          playerOffsetTop: document.querySelector('.car-player').offsetTop,
          move_down: this.state.playerOffsetTop < parseInt(this.state.clientHeight) - 183 ? requestAnimationFrame(this.down) : cancelAnimationFrame(this.state.move_down)
        })
      }
    }
    componentDidMount(){
      //set height and width to use for collisions
      this.setState({
        clientHeight: document.querySelector('.road').clientHeight,
        clientWidth: document.querySelector('.road').clientWidth
      })

      const music = require('./music/Aparatus.mp3');
      const backgroundMusic = new Audio(music)

      document.addEventListener('keydown', e => this.turn(e))
      document.addEventListener('keyup', e => this.turnStop(e))
      setTimeout(() => {
        document.addEventListener('load', this.animateBackground());
      }, 1000)

      backgroundMusic.play()


    }

     render() {
       return (
         <div className="road">
           <div className="road-background" style={{top:this.state.road}}>
             <div className="stripe stripe-l" style={{top:this.state.stripe1}}></div>
             <div className="stripe stripe-l" style={{top:this.state.stripe2}}></div>
             <div className="stripe stripe-l" style={{top:this.state.stripe3}}></div>
             <div className="stripe stripe-l" style={{top:this.state.stripe4}}></div>
             <div className="stripe stripe-r" style={{top:this.state.stripe1}}></div>
             <div className="stripe stripe-r" style={{top:this.state.stripe2}}></div>
             <div className="stripe stripe-r" style={{top:this.state.stripe3}}></div>
             <div className="stripe stripe-r" style={{top:this.state.stripe4}}></div>
             <div className="car car-player" style={{left:this.state.player_left, bottom:this.state.player_bottom, transform:this.state.player_rotate}}></div>
             <div className="car car-1" style={{top:this.state.car1}}></div>
             <div className="car car-2" style={{top:this.state.car2}}></div>
             <div className="car car-3" style={{top:this.state.car3}}></div>
           </div>
         </div>
       )
     }
   }


  ReactDOM.render(
      <Game />,
      document.getElementById('app')
  );
});
