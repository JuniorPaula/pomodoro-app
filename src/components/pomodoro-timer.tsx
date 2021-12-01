import React, { useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { SecondsToTimes } from '../utils/second-to-times';
import { Button } from './button';
import { Timer } from './timer';

const bellStart = require('../sounds/bell-start.mp3').default;
const bellfinish = require('../sounds/bell-finish.mp3').default;

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
  const [cyclesQtdManager, setCyclesQtdManager] = React.useState(
    new Array(props.cycles - 1).fill(true)
  );

  const [completedCycles, setComplitedCycles] = React.useState(0);
  const [fullWorkingTime, setFullWorkingTime] = React.useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = React.useState(0);

  useInterval(
    () => {
      setMainTimer(mainTimer - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timerCounting ? 1000 : null
  );

  const configureWork = useCallback(() => {
    setTimerCounting(true);
    setWorking(true);
    setResting(false);
    setMainTimer(props.pomodoroTime);
    audioStartWorking.play();
  }, [
    setTimerCounting,
    setWorking,
    setResting,
    setMainTimer,
    props.pomodoroTime,
  ]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimerCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTimer(props.longRestTimer);
      } else {
        setMainTimer(props.shortRestTime);
      }

      audioStopWorking.play();
    },
    [
      setTimerCounting,
      setWorking,
      setResting,
      setMainTimer,
      props.longRestTimer,
      props.shortRestTime,
    ]
  );

  React.useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTimer > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setComplitedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTimer,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>Status: {working ? 'Trabalhando' : 'Descançando'}</h2>
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
        <p>
          <b>Ciclos concluídos: </b>
          {completedCycles}
        </p>
        <p>
          <b>Horas trabalhadas: </b>
          {SecondsToTimes(fullWorkingTime)}
        </p>
        <p>
          <b>Número de pomodoros: </b>
          {numberOfPomodoros}
        </p>
      </div>
    </div>
  );
}
