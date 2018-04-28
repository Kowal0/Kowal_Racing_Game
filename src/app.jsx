// TODO: code refactoring ;)
// TODO: dividing code into separate components
// TODO: add player-controlled speed
// TODO: add score

import React from 'react';
import ReactDOM from 'react-dom';

import style from './scss/main.scss'

document.addEventListener("DOMContentLoaded", function(){

  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state={
        game_over: false,
        timer: 30,
        resultText: "",
        resultClass: "",

        isMobile: window.innerWidth,
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
        player_rotate: "rotate(180deg)",

        stripe_on: true,

        stripe1: "-150px",
        stripe2: "150px",
        stripe3: "450px",
        stripe4: "750px",

        car1: "-100px",
        car1Left: "60%",
        car1OffsetLeft: null,
        car2: "-200px",
        car2Left: "40%",
        car2OffsetLeft: null,
        car3: "-350px",
        car3Left: "50%",
        car3OffsetLeft: null,
        car4: "-550px",
        car4Left: "10%",
        car4OffsetLeft: null,
      }
    }

    countTime = () => {
        this.timer = setInterval(() => {
          if (this.state.timer === 0) {
            this.setState({
              game_over: true,
              resultText: "Git!",
              resultClass: "result"
            })
            this.backgroundMusic.pause();
            clearInterval(this.timer);
          } else if (this.state.game_over === true) {
            this.setState({
              resultText: "Lol!",
              resultClass: "result"
            })
            this.backgroundMusic.pause();
            clearInterval(this.timer);
          } else {
            this.setState({
              timer: this.state.timer - 1
            })
          }
        }, 1000)
    }

    //car collisions
    carCollide = () => {
      this.playerYTop = this.state.playerOffsetTop;
      this.playerYBottom = this.state.playerOffsetTop + 163;
      this.playerXLeft = this.state.playerOffsetLeft;
      this.playerXRight = this.state.playerOffsetLeft + 75;

      this.car1YTop = parseInt(this.state.car1);
      this.car1YBottom = parseInt(this.state.car1) + 163;
      this.car1XLeft = this.state.car1OffsetLeft;
      this.car1XRight = this.state.car1OffsetLeft + 75;

      this.car2YTop = parseInt(this.state.car2);
      this.car2YBottom = parseInt(this.state.car2) + 163;
      this.car2XLeft = this.state.car2OffsetLeft;
      this.car2XRight = this.state.car2OffsetLeft + 75;

      this.car3YTop = parseInt(this.state.car3);
      this.car3YBottom = parseInt(this.state.car3) + 163;
      this.car3XLeft = this.state.car3OffsetLeft;
      this.car3XRight = this.state.car3OffsetLeft + 75;

      this.car4YTop = parseInt(this.state.car4);
      this.car4YBottom = parseInt(this.state.car4) + 163;
      this.car4XLeft = this.state.car4OffsetLeft;
      this.car4XRight = this.state.car4OffsetLeft + 75;

      if (((this.playerYBottom >= this.car1YTop && this.playerYBottom <= this.car1YBottom) ||
      (this.playerYTop <= this.car1YBottom && this.playerYTop >= this.car1YTop)) &&
      ((this.playerXLeft <= this.car1XRight && this.playerXLeft >= this.car1XLeft) ||
      (this.playerXRight >= this.car1XLeft && this.playerXRight <= this.car1XRight))) {
          this.crash.play();
          this.setState({
            game_over: true
          })
      } else if (((this.playerYBottom >= this.car2YTop && this.playerYBottom <= this.car2YBottom) ||
      (this.playerYTop <= this.car2YBottom && this.playerYTop >= this.car2YTop)) &&
      ((this.playerXLeft <= this.car2XRight && this.playerXLeft >= this.car2XLeft) ||
      (this.playerXRight >= this.car2XLeft && this.playerXRight <= this.car2XRight))) {
        this.crash.play();
        this.setState({
          game_over: true
        })
      } else if (((this.playerYBottom >= this.car3YTop && this.playerYBottom <= this.car3YBottom) ||
      (this.playerYTop <= this.car3YBottom && this.playerYTop >= this.car3YTop)) &&
      ((this.playerXLeft <= this.car3XRight && this.playerXLeft >= this.car3XLeft) ||
      (this.playerXRight >= this.car3XLeft && this.playerXRight <= this.car3XRight))) {
        this.crash.play();
        this.setState({
          game_over: true
        })
      } else if (((this.playerYBottom >= this.car4YTop && this.playerYBottom <= this.car4YBottom) ||
      (this.playerYTop <= this.car4YBottom && this.playerYTop >= this.car4YTop)) &&
      ((this.playerXLeft <= this.car4XRight && this.playerXLeft >= this.car4XLeft) ||
      (this.playerXRight >= this.car4XLeft && this.playerXRight <= this.car4XRight))) {
        this.crash.play();
        this.setState({
          game_over: true
        })
      }
    }
    //car spawning
    spawnCar = () => {
      this.setState({
        car1Left: (parseInt(this.state.car1) > parseInt(this.state.clientHeight)) ? Math.floor(Math.random() * (31 - 5) + 5) + "%" : this.state.car1Left,
        car2Left: (parseInt(this.state.car2) > parseInt(this.state.clientHeight)) ? Math.floor(Math.random() * (57 - 31) + 26) + "%" : this.state.car2Left,
        car3Left: (parseInt(this.state.car3) > parseInt(this.state.clientHeight)) ? Math.floor(Math.random() * (85 - 57) + 57) + "%" : this.state.car3Left,
        car4Left: (parseInt(this.state.car4) > parseInt(this.state.clientHeight)) ? Math.floor(Math.random() * (85 - 30) + 30) + "%" : this.state.car4Left,
      })
    }

    //background
    animateBackground = () => {
      console.log();
      if (this.state.game_over === false) {
        this.setState({
          stripe_on: requestAnimationFrame(this.animateBackground),

          stripe1: (parseInt(this.state.stripe1) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe1) + 14 + "px" : "-150px",
          stripe2: (parseInt(this.state.stripe2) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe2) + 14 + "px" : "-150px",
          stripe3: (parseInt(this.state.stripe3) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe3) + 14 + "px" : "-150px",
          stripe4: (parseInt(this.state.stripe4) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe4) + 14 + "px" : "-150px",

          car1OffsetLeft: document.querySelector('.car-1').offsetLeft,
          car2OffsetLeft: document.querySelector('.car-2').offsetLeft,
          car3OffsetLeft: document.querySelector('.car-3').offsetLeft,
          car4OffsetLeft: document.querySelector('.car-4').offsetLeft,


          car1: (parseInt(this.state.car1) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car1) + 12 + "px" : "-100px",
          car2: (parseInt(this.state.car2) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car2) + 12 + "px" : "-150px",
          car3: (parseInt(this.state.car3) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car3) + 12 + "px" : "-200px",
          car4: (parseInt(this.state.car4) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car4) + 12 + "px" : "-550px",
        })
        this.carCollide();
        this.spawnCar();
      }
    }

    //moving player
    turn = (e) => {
      if (this.state.game_over === false) {
        let key = e.keyCode;
        this.setState({
           playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
           playerOffsetTop: document.querySelector('.car-player').offsetTop,
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

    //check if window is wide enough to play the game
    handleWindowSizeChange = () => {
      this.setState({ isMobile: window.innerWidth });
    };


    componentDidMount(){
      //set height, width and offset to use for collisions
      this.setState({
        clientHeight: document.querySelector('.road').clientHeight,
        clientWidth: document.querySelector('.road').clientWidth,
        playerOffsetTop: document.querySelector('.car-player').offsetTop,
        playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
      })

      this.music = require('./music/Aparatus.mp3');
      this.backgroundMusic = new Audio(this.music);
      this.carCrash = require('./music/Car-crash.mp3');
      this.crash = new Audio(this.carCrash);

      window.addEventListener('resize', this.handleWindowSizeChange);
      document.addEventListener('keydown', e => this.turn(e))
      document.addEventListener('keyup', e => this.turnStop(e))
      setTimeout(() => {
        document.addEventListener('load', this.animateBackground());
        document.addEventListener('load', this.countTime());
      }, 1000)
      this.backgroundMusic.play()
    }

    // componentWillUnmount() {
    //   window.removeEventListener('resize', this.handleWindowSizeChange);
    // }

     render() {
       const isMobile = this.state.isMobile <= 679;
       console.log(isMobile);
       console.log(this.state.isMobile);
       if (isMobile) {
         return (
            <div className="is-mobile">This screen is to small to play the game.
              To fully experience this amazing creation you need to run it in a browser of at least 680px width
            </div>
         )
       } else {
         return (
           <div className="road">
             <div className={this.state.resultClass}>{this.state.resultText}</div>
               <div className="timer">{this.state.timer}</div>
               <div className="stripe stripe-l" style={{top:this.state.stripe1}}></div>
               <div className="stripe stripe-l" style={{top:this.state.stripe2}}></div>
               <div className="stripe stripe-l" style={{top:this.state.stripe3}}></div>
               <div className="stripe stripe-l" style={{top:this.state.stripe4}}></div>
               <div className="stripe stripe-r" style={{top:this.state.stripe1}}></div>
               <div className="stripe stripe-r" style={{top:this.state.stripe2}}></div>
               <div className="stripe stripe-r" style={{top:this.state.stripe3}}></div>
               <div className="stripe stripe-r" style={{top:this.state.stripe4}}></div>
               <div className="car car-player" style={{left:this.state.player_left, bottom:this.state.player_bottom, transform:this.state.player_rotate}}></div>
               <div className="car car-1" style={{top:this.state.car1, left:this.state.car1Left}}></div>
               <div className="car car-2" style={{top:this.state.car2, left:this.state.car2Left}}></div>
               <div className="car car-3" style={{top:this.state.car3, left:this.state.car3Left}}></div>
               <div className="car car-4" style={{top:this.state.car4, left:this.state.car4Left}}></div>
           </div>
         )
       }

     }
   }


  ReactDOM.render(
      <Game />,
      document.getElementById('app')
  );
});
