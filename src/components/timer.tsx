import React from 'react';
import { SecondsToMinuts } from '../utils/second-to-minuts';

interface Props {
  mainTimer: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{SecondsToMinuts(props.mainTimer)}</div>;
}
