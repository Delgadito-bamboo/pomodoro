'use strict';

class Timer{
  constructor(status,duration,startButton,stopButton,finishMusic){
    this.status = status;
    this.duration = duration;
    this.startButton = startButton;
    this.stopButton = stopButton;
    this.finishMusic = finishMusic;
    this.isWorkTime = true;
    this.onTick = false;

    this.durationTime = 0;
    this.duration.innerHTML = `25 : 00`;
    this.status.innerHTML = "Work Time";

    this.startButton.addEventListener('click', this.start);
    this.stopButton.addEventListener('click', this.stop);
  };

  start= ()=>{
      if(this.isWorkTime && this.timeRemaining === 0 && !this.onTick){
        this.setStart(10);
      }else if(!this.isWorkTime && this.timeRemaining === 0 && !this.ontick){
        this.setStart(5);
      }else{
      };
    };

  tick = ()=>{
    if(this.timeRemaining > 0){
        this.timeRemaining = this.timeRemaining -1;
        this.duration.innerHTML = this.displayTime(this.timeRemaining) ;
      }else{
        this.stop();
      }
    };

  displayTime =(time) =>{
    return ` ${("0" + Math.floor(time / 60)).slice(-2)} : ${("0" + time % 60).slice(-2)} `
  };


  stop = ()=>{
    this.onTick = false;

    if(this.timeRemaining === 0){
      clearInterval(this.interval);
      if(this.isWorkTime){
        this.setStop("Break Time", `5 : 00`, true);
      }else{
        this.setStop("Work Time",`25 : 00`, false)
      };
    };
  };

  get timeRemaining(){
    return  parseFloat(this.durationTime);
  };

  set timeRemaining(time){
    this.durationTime = time;
  };

  setStart = (setDuration) =>{
      this.durationTime = setDuration;
      this.onTick = true;
      this.interval = setInterval(this.tick,1000);
    };

  setStop = (nextStatus, nextDuration,checkWorkTime)=>{
    this.finishMusic.play();
        this.isWorkTime = !checkWorkTime ;
        this.status.innerHTML = nextStatus;
        this.duration.innerHTML = nextDuration;
  };
};
