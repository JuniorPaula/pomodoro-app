import React from 'react';
import { SecondsToTimer } from '../utils/second-to-time';

interface Props {
  mainTimer: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{SecondsToTimer(props.mainTimer)}</div>;
}
