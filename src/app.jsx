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
        gameOver: false,
        timer: 30,
        score: 0,
        resultText: "",
        resultClass: "",

        isMobile: window.innerWidth,
        clientHeight: 0,
        clientWidth: 0,

        playerOffsetLeft: 0,
        playerOffsetTop: 0,

        moveRight: false,
        moveLeft: false,
        moveUp: false,
        moveDown: false,

        playerLeft: "44%",
        playerBottom: "2%",
        playerRotate: "rotate(180deg)",

        playerSpeed: 1,
        carSpeed: 8,
        backgroundSpeed: 10,

        animateOn: true,

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
              gameOver: true,
              resultText: "Bravo! Your score: " + this.state.score,
              resultClass: "result"
            })
            this.backgroundMusic.pause();
            clearInterval(this.timer);
          } else if (this.state.gameOver === true) {
            this.setState({
              resultText: "Try again! Your score: " + this.state.score,
              resultClass: "result"
            })
            this.backgroundMusic.pause();
            clearInterval(this.timer);
          } else {
            this.setState({
              timer: this.state.timer - 1,
              //update score every second
              score: this.state.score + (this.state.backgroundSpeed * 10)
            })
          }
        }, 1000)
    }

    //car collisions
    carCollide = () => {
      this.playerTop = this.state.playerOffsetTop;
      this.playerBottom = this.state.playerOffsetTop + 163;
      this.playerLeft = this.state.playerOffsetLeft;
      this.playerRight = this.state.playerOffsetLeft + 75;

      this.car1Top = parseInt(this.state.car1);
      this.car1Bottom = parseInt(this.state.car1) + 163;
      this.car1Left = this.state.car1OffsetLeft;
      this.car1Right = this.state.car1OffsetLeft + 75;

      this.car2Top = parseInt(this.state.car2);
      this.car2Bottom = parseInt(this.state.car2) + 163;
      this.car2Left = this.state.car2OffsetLeft;
      this.car2Right = this.state.car2OffsetLeft + 75;

      this.car3Top = parseInt(this.state.car3);
      this.car3Bottom = parseInt(this.state.car3) + 163;
      this.car3Left = this.state.car3OffsetLeft;
      this.car3Right = this.state.car3OffsetLeft + 75;

      this.car4Top = parseInt(this.state.car4);
      this.car4Bottom = parseInt(this.state.car4) + 163;
      this.car4Left = this.state.car4OffsetLeft;
      this.car4Right = this.state.car4OffsetLeft + 75;

      if (((this.playerBottom >= this.car1Top && this.playerBottom <= this.car1Bottom) ||
      (this.playerTop <= this.car1Bottom && this.playerTop >= this.car1Top)) &&
      ((this.playerLeft <= this.car1Right && this.playerLeft >= this.car1Left) ||
      (this.playerRight >= this.car1Left && this.playerRight <= this.car1Right))) {
          this.crash.play();
          this.setState({
            gameOver: true
          })
      } else if (((this.playerBottom >= this.car2Top && this.playerBottom <= this.car2Bottom) ||
      (this.playerTop <= this.car2Bottom && this.playerTop >= this.car2Top)) &&
      ((this.playerLeft <= this.car2Right && this.playerLeft >= this.car2Left) ||
      (this.playerRight >= this.car2Left && this.playerRight <= this.car2Right))) {
        this.crash.play();
        this.setState({
          gameOver: true
        })
      } else if (((this.playerBottom >= this.car3Top && this.playerBottom <= this.car3Bottom) ||
      (this.playerTop <= this.car3Bottom && this.playerTop >= this.car3Top)) &&
      ((this.playerLeft <= this.car3Right && this.playerLeft >= this.car3Left) ||
      (this.playerRight >= this.car3Left && this.playerRight <= this.car3Right))) {
        this.crash.play();
        this.setState({
          gameOver: true
        })
      } else if (((this.playerBottom >= this.car4Top && this.playerBottom <= this.car4Bottom) ||
      (this.playerTop <= this.car4Bottom && this.playerTop >= this.car4Top)) &&
      ((this.playerLeft <= this.car4Right && this.playerLeft >= this.car4Left) ||
      (this.playerRight >= this.car4Left && this.playerRight <= this.car4Right))) {
        this.crash.play();
        this.setState({
          gameOver: true
        })
      }
    }
    //car spawning
    spawnCar = () => {
      this.setState({
        car1Left: (parseInt(this.state.car1) > parseInt(this.state.clientHeight)) ? Math.floor(Math.random() * (27 - 5) + 5) + "%" : this.state.car1Left,
        car2Left: (parseInt(this.state.car2) > parseInt(this.state.clientHeight)) ? Math.floor(Math.random() * (49 - 27) + 27) + "%" : this.state.car2Left,
        car3Left: (parseInt(this.state.car3) > parseInt(this.state.clientHeight)) ? Math.floor(Math.random() * (71 - 49) + 49) + "%" : this.state.car3Left,
        car4Left: (parseInt(this.state.car4) > parseInt(this.state.clientHeight)) ? Math.floor(Math.random() * (92 - 71) + 71) + "%" : this.state.car4Left,
      })
    }

    //background
    animateBackground = () => {
      console.log();
      if (this.state.gameOver === false) {
        this.setState({
          animateOn: requestAnimationFrame(this.animateBackground),

          stripe1: (parseInt(this.state.stripe1) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe1) + this.state.backgroundSpeed + "px" : "-150px",
          stripe2: (parseInt(this.state.stripe2) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe2) + this.state.backgroundSpeed + "px" : "-150px",
          stripe3: (parseInt(this.state.stripe3) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe3) + this.state.backgroundSpeed + "px" : "-150px",
          stripe4: (parseInt(this.state.stripe4) < parseInt(this.state.clientHeight) + 75) ? parseInt(this.state.stripe4) + this.state.backgroundSpeed + "px" : "-150px",

          car1OffsetLeft: document.querySelector('.car-1').offsetLeft,
          car2OffsetLeft: document.querySelector('.car-2').offsetLeft,
          car3OffsetLeft: document.querySelector('.car-3').offsetLeft,
          car4OffsetLeft: document.querySelector('.car-4').offsetLeft,

          car1: (parseInt(this.state.car1) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car1) + this.state.carSpeed + "px" : "-100px",
          car2: (parseInt(this.state.car2) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car2) + this.state.carSpeed + "px" : "-150px",
          car3: (parseInt(this.state.car3) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car3) + this.state.carSpeed + "px" : "-200px",
          car4: (parseInt(this.state.car4) < parseInt(this.state.clientHeight)) ? parseInt(this.state.car4) + this.state.carSpeed + "px" : "-550px",
        })
        this.carCollide();
        this.spawnCar();
      }
    }

    speedUp = (e) => {
      if (this.state.gameOver === false) {
        console.log(this.state.playerSpeed);
        let key = e.keyCode
        if (key === 87 && this.state.backgroundSpeed < 18) {
          this.setState({
            playerSpeed: this.state.playerSpeed + 0.2,
            carSpeed: this.state.carSpeed + 4,
            backgroundSpeed: this.state.backgroundSpeed + 4
          });
        } else if (key === 83 && this.state.backgroundSpeed > 10) {
          this.setState({
            playerSpeed: this.state.playerSpeed - 0.2,
            carSpeed: this.state.carSpeed - 4,
            backgroundSpeed: this.state.backgroundSpeed - 4
          });
        }
      }
    }

    //moving player
    turn = (e) => {
      if (this.state.gameOver === false) {
        let key = e.keyCode;
        this.setState({
           playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
           playerOffsetTop: document.querySelector('.car-player').offsetTop,
        });
        if (key === 37 && this.state.moveLeft === false ) {
            this.setState({
              moveLeft: this.state.playerOffsetLeft > 10 ? requestAnimationFrame(this.left) : cancelAnimationFrame(this.state.moveLeft)
            })
        } else if (key === 38 && this.state.moveUp === false) {
            this.setState({
              moveUp: this.state.playerOffsetTop > 10 ? requestAnimationFrame(this.up) : cancelAnimationFrame(this.state.moveUp)
            })
        } else if (key === 39 && this.state.moveRight === false) {
            this.setState({
              moveRight: this.state.playerOffsetLeft  <  parseInt(this.state.clientWidth) - 99 ? requestAnimationFrame(this.right) : cancelAnimationFrame(this.state.moveRight)
            })
        } else if (key === 40 && this.state.moveDown === false) {
            this.setState({
              moveDown: requestAnimationFrame(this.down)
            })
          }
        }
      }
      turnStop = (e) => {
        if (this.state.gameOver === false) {
        let key = e.keyCode;
        if (key === 37) {
          this.setState({
            playerRotate: "rotate(180deg)",
            playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
            moveLeft: cancelAnimationFrame(this.state.moveLeft),
            moveLeft: false
          })
        } else if (key === 38  ) {
          this.setState({
            playerOffsetTop: document.querySelector('.car-player').offsetTop,
            moveUp: cancelAnimationFrame(this.state.moveUp),
            moveUp: false
          })
        } else if (key === 39) {
          this.setState({
            playerRotate: "rotate(180deg)",
            playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
            moveRight: cancelAnimationFrame(this.state.moveRight),
            moveRight: false
          })
        } else if (key === 40) {
          this.setState({
            playerOffsetTop: document.querySelector('.car-player').offsetTop,
            moveDown: cancelAnimationFrame(this.state.moveDown),
            moveDown: false
          })
      }
    }
  }

    left = (e) => {
      if (this.state.gameOver === false) {
        console.log(this.state.playerLeft);

        this.carCollide();
        this.setState({
          playerRotate: "rotate(173deg)",
          playerLeft: parseInt(this.state.playerLeft) - this.state.playerSpeed + "%",
          playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
          moveLeft: this.state.playerOffsetLeft > 10 ? requestAnimationFrame(this.left) : cancelAnimationFrame(this.state.moveLeft)
        })
      }
    }
    right = (e) => {
      if (this.state.gameOver === false) {
        console.log(this.state.playerLeft);
        this.carCollide();
        this.setState({
          playerRotate: "rotate(187deg)",
          playerLeft: parseInt(this.state.playerLeft) + this.state.playerSpeed + "%",
          playerOffsetLeft: document.querySelector('.car-player').offsetLeft,
          moveRight: this.state.playerOffsetLeft  <  parseInt(this.state.clientWidth) - 99 ? requestAnimationFrame(this.right) : cancelAnimationFrame(this.state.moveRight)
        })
      }
    }
    up = (e) => {
      this.carCollide();
      if (this.state.gameOver === false) {
        this.carCollide();
        this.setState({
          playerBottom: parseInt(this.state.playerBottom) + this.state.playerSpeed + "%",
          playerOffsetTop: document.querySelector('.car-player').offsetTop,
          moveUp: this.state.playerOffsetTop > 10 ? requestAnimationFrame(this.up) : cancelAnimationFrame(this.state.moveUp)
        })
      }
    }
    down = (e) => {
      this.carCollide();
      if (this.state.gameOver === false) {
        this.setState({
          playerBottom: parseInt(this.state.playerBottom) - this.state.playerSpeed + "%",
          playerOffsetTop: document.querySelector('.car-player').offsetTop,
          moveDown: this.state.playerOffsetTop < parseInt(this.state.clientHeight) - 183 ? requestAnimationFrame(this.down) : cancelAnimationFrame(this.state.moveDown)
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
      });

      this.music = require('./music/Aparatus.mp3');
      this.backgroundMusic = new Audio(this.music);
      this.carCrash = require('./music/Car-crash.mp3');
      this.crash = new Audio(this.carCrash);

      window.addEventListener('resize', this.handleWindowSizeChange);

      document.addEventListener('keydown', e => this.turn(e));
      document.addEventListener('keyup', e => this.turnStop(e));
      document.addEventListener('keydown', e => this.speedUp(e));

      setTimeout(() => {
        document.addEventListener('load', this.animateBackground());
        document.addEventListener('load', this.countTime());

      }, 1000);

      this.backgroundMusic.play();
    }

     render() {
       const isMobile = this.state.isMobile <= 679;
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
               <div className="score">Score:{this.state.score}</div>
               <div className="stripe stripe-l" style={{top:this.state.stripe1}}></div>
               <div className="stripe stripe-l" style={{top:this.state.stripe2}}></div>
               <div className="stripe stripe-l" style={{top:this.state.stripe3}}></div>
               <div className="stripe stripe-l" style={{top:this.state.stripe4}}></div>
               <div className="stripe stripe-r" style={{top:this.state.stripe1}}></div>
               <div className="stripe stripe-r" style={{top:this.state.stripe2}}></div>
               <div className="stripe stripe-r" style={{top:this.state.stripe3}}></div>
               <div className="stripe stripe-r" style={{top:this.state.stripe4}}></div>
               <div className="car car-player" style={{left:this.state.playerLeft, bottom:this.state.playerBottom, transform:this.state.playerRotate}}></div>
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
