import { useState } from "react";
import "./App.css";
import { interval, startWith, scan } from 'rxjs';

const observable$ = interval(1000).pipe(startWith(0), scan(time=>time+1));

export default function App() {
  const [time, setTime] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = useState(0);
  const [interv, setInterv] = useState(0);


  const start = () => {
    if (status === 1) {
      interv.unsubscribe();
      setTime(0);
      setStatus(0);
      setInterv(0);
      return;
    }
    setInterv(observable$.subscribe(setTime));
    setStatus(1);
  };
  
  const wait = () => {
    if (isClicked) {
      if (interv) {
         interv.unsubscribe();
         setIsClicked(false);
         setStatus(0);
         return;
       }
    };
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
   
 }

  const reset = () => {
    if (interv) {
      interv.unsubscribe();
      setTime(0);
      setInterv(observable$.subscribe(setTime));
      setStatus(1);
      return;
    }
  }

  return (
    <div className="stopwatcher">
        <h2 className="title">STOPWATCH</h2>
        <div className="clockFace">
          <span className="time">{('0' + Math.floor(time / (60 * 60))).slice(-2)}</span>:
          <span className="time">{('0' + Math.floor(time / 60)).slice(-2)}</span>:
          <span className="time">{('0' + Math.floor(time % 60)).slice(-2)}</span>
        </div>
        <div className="clockBtns">
          <button type='button' className="clockBtn" onClick={start}>Start/Stop</button>
          <button type='button' className="clockBtn" onClick={wait}>Wait</button>
          <button type='button' className="clockBtn" onClick={() => reset()}>Reset</button>
        </div>
    </div>
  );
}
