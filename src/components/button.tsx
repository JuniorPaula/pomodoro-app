import React from 'react';

interface Props {
  onClick?: () => void;
  text: string;
  clasName?: string;
}

export function Button(props: Props): JSX.Element {
  return (
    <button className={props.clasName} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
