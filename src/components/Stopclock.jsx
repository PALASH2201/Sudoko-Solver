import { VscDebugStart } from "react-icons/vsc";
import { LuPause } from "react-icons/lu";
import { GrPowerReset } from "react-icons/gr";
import "./stopclock.css";
import { useState } from "react";
const Stopclock = () => {
  const [time, setTime] = useState({
    hrs: 0,
    min: 0,
    sec: 0,
  });
  const [intervalId, setIntervalId] = useState();
  const updateTime = () => {
    setTime((prev) => {
      let newTime = { ...prev };
      if (newTime.sec < 59) {
        newTime.sec += 1;
      } else {
        newTime.min += 1;
        newTime.sec = 0;
      }
      if (newTime.min === 60) {
        newTime.hrs += 1;
        newTime.min = 0;
      }
      return newTime;
    });
  };
  const start = () => {
    if (!intervalId) {
      let id = setInterval(updateTime, 1000);
      setIntervalId(id);
    }
  };
  const pause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId("");
    }
  };
  const reset = () => {
    clearInterval(intervalId);
    setIntervalId("");
    setTime({
      hrs: 0,
      min: 0,
      sec: 0,
    });
  };
  return (
    <div className="stopclock-container">
      <div className="timer-container">
        <span>
          {`${time.hrs < 10 ? 0 : ""}`}
          {time.hrs}
        </span>
        :
        <span>
          {`${time.min < 10 ? 0 : ""}`}
          {time.min}
        </span>
        :
        <span>
          {`${time.sec < 10 ? 0 : ""}`}
          {time.sec}
        </span>
      </div>
      <div className="controls">
        <button onClick={start} className="start">
          <VscDebugStart size={30} />
        </button>
        <button onClick={pause} className="pause">
          <LuPause size={30} />
        </button>
        <button onClick={reset} className="reset">
          <GrPowerReset size={30} />
        </button>
      </div>
    </div>
  );
};

export default Stopclock;
