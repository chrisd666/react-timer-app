import { useEffect, useState } from "react";
import { StatusEnum } from "../../enums";
import { ITime } from "../../interfaces";
import HomePresentation from "./Home.presentation";

export default function Home() {
  const [time, setTime] = useState({ hours: 0, minutes: 3, seconds: 0 });
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.STOPPED);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const handleSubmit = (values: ITime) => {
    let { hours, minutes, seconds } = { ...values };

    if (seconds >= 60) {
      const extraMinutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      minutes += extraMinutes;
      seconds = remainingSeconds;
    }

    if (minutes >= 60) {
      const extraHours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      hours += extraHours;
      minutes = remainingMinutes;
    }

    setTime({ hours, minutes, seconds });
  };

  const start = () => {
    if (status === StatusEnum.RUNNING) return;

    setStatus(StatusEnum.RUNNING);
    setTimer(setInterval(run, 1000));
  };

  let { hours, minutes, seconds } = { ...time };

  const run = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return stop();
    }

    if (minutes === 0 && seconds === 0) {
      hours--;
      minutes = 60;
    }

    if (seconds === 0) {
      minutes--;
      seconds = 60;
    }

    seconds--;

    return setTime({ hours, minutes, seconds });
  };

  const pause = () => {
    clearInterval(timer);
    setStatus(StatusEnum.PAUSED);
  };

  const stop = () => {
    clearInterval(timer);
    setStatus(StatusEnum.STOPPED);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    if (status === StatusEnum.STOPPED) clearInterval(timer);
  }, [status, timer]);

  return (
    <HomePresentation
      state={{ status, time }}
      handler={{ handleSubmit, start, pause, stop }}
    />
  );
}
