import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  defaultPomodoroTime: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTimer, setMainTimer] = React.useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTimer(mainTimer - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <Timer mainTimer={mainTimer} />
      <h2>Status: Trabalando...</h2>
      <Button text="teste" />
    </div>
  );
}
