import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { SecondsToTimer } from '../utils/second-to-time';

interface Props {
  defaultPomodoroTime: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTimer, setMainTimer] = React.useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTimer(mainTimer - 1);
  }, 1000);

  return <div>Hello World! {SecondsToTimer(mainTimer)}</div>;
}
