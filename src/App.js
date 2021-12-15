import { useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = useState(0);
  const [interv, setInterv] = useState(0);

  const start = () => {
    if (status === 1) {
      clearInterval(interv);
      setTime(0);
      setStatus(0);
      setInterv(0);
      return;
    }
    setInterv(setInterval(run, 1000));
    setStatus(1);
  }
  
  const wait = () => {
    if (isClicked) {
       if (interv) {
         clearInterval(interv);
         setIsClicked(false);
         setStatus(0);
         return;
       }
    };
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
   
 }

  const run = () => {
    return setTime(prevTime => prevTime + 1);
  }

  const reset = () => {
    if (interv) {
      clearInterval(interv);
      setTime(0);
      setInterv(setInterval(run, 1000));
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
