import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellfinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellfinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTimer: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTimer, setMainTimer] = React.useState(props.pomodoroTime);
  const [timerCounting, setTimerCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);

  React.useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  useInterval(
    () => {
      setMainTimer(mainTimer - 1);
    },
    timerCounting ? 1000 : null
  );

  const configureWork = () => {
    setTimerCounting(true);
    setWorking(true);
    setResting(false);
    setMainTimer(props.pomodoroTime);
    audioStartWorking.play();
  };

  const configureRest = (long: boolean) => {
    setTimerCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTimer(props.longRestTimer);
    } else {
      setMainTimer(props.shortRestTime);
    }

    audioStopWorking.play();
  };

  return (
    <div className="pomodoro">
      <h2>Status: Trabalando...</h2>
      <Timer mainTimer={mainTimer} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />
        <Button text="Rest" onClick={() => configureRest(false)} />
        <Button
          clasName={!working && !resting ? 'hidden' : ''}
          text={timerCounting ? 'Pause' : 'Play'}
          onClick={() => setTimerCounting(!timerCounting)}
        />
      </div>

      <div className="details">
        <p>testando asln asjby slnu laskn</p>
        <p>testando asln asjby slnu laskn</p>
        <p>testando asln asjby slnu laskn</p>
        <p>testando asln asjby slnu laskn</p>
      </div>
    </div>
  );
}
