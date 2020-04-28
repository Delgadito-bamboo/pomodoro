'use strict';

class Timer{
  constructor(status,duration,startButton,stopButton,finishMusic){
    this.duration = duration;
    this.startButton = startButton;
    this.stopButton = stopButton;
    this.status = status;
    this.finishMusic = finishMusic;
    this.isWorkTime = true;
    this.onTick = false;

    this.durationTime = 0;
    this.duration.innerHTML = `25 : 00`;
    this.status.innerHTML = "Work Time";

    this.startButton.addEventListener('click', this.start);
    this.stopButton.addEventListener('click', this.stop);
  }

  start= ()=>{
    if(this.onTick){
    }else{
      if(this.isWorkTime && this.durationTime === 0){
        this.durationTime = 10;
        this.onTick = true;
        this.interval = setInterval(this.tick,1000);
      }else if(!this.isWorkTime && this.durationTime === 0){
        this.durationTime = 5;
        this.onTick = true;
        this.interval = setInterval(this.tick,1000);
      }else{
        this.interval = setInterval(this.tick,1000);
      }
    }
  }
  
  tick = ()=>{
    if(this.timeRemaining > 0){
        this.timeRemaining = this.timeRemaining -1;
        this.duration.innerHTML = `${("0" + Math.floor(this.timeRemaining / 60)).slice(-2)} : ${("0" + this.timeRemaining % 60).slice(-2)}` ;
      }else{
        this.stop();
      }
    }


  stop = ()=>{
    this.onTick = false;

    if(this.timeRemaining === 0){
      clearInterval(this.interval);
      if(this.isWorkTime){
        this.finishMusic.play();
        this.isWorkTime = false;
        this.status.innerHTML = "Breaking Time";
        this.duration.innerHTML = `05 : 00`
      }else{
        this.finishMusic.play();
        this.isWorkTime = true;
        this.status.innerHTML= "Work Time";
        this.duration.innerHTML = `25 : 00`
      }
    }else{
      clearInterval(this.interval);
    }


  }

  get timeRemaining(){
    return  parseFloat(this.durationTime);
  }

  set timeRemaining(time){
    this.durationTime = time;
  }
}