import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTimer: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTimer, setMainTimer] = React.useState(props.pomodoroTime);

  useInterval(() => {
    setMainTimer(mainTimer - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>Status: Trabalando...</h2>
      <Timer mainTimer={mainTimer} />
      <div className="controls">
        <Button text="teste" />
        <Button text="teste" />
        <Button text="teste" />
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
