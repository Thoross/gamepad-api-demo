import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import { getControllerIcon, getControllerProfile } from './controller-profiles/controller-profile';
import Button from './Button';
import ControllerAxes from './ControllerAxes';

type GamepadState = Gamepad | null | undefined

const getAxesLabels = (index: number) => {
  switch (index) {
    case 0:
      return 'Left Stick X';
    case 1:
      return 'Left Stick Y';
    case 2:
      return 'Right Stick X';
    case 3:
      return 'Right Stick Y';
    default:
      return 'Unknown';
  }
}

const renderButtons = (gamepadState: GamepadState): ReactNode => {
  if (!gamepadState) {
    return <p>No gamepad connected.</p>;
  }

  const buttons: string[] = getControllerProfile(gamepadState.id)

  return (
    <div>
      <h2>Buttons</h2>
      <div className='buttons flex flex-wrap justify-between gap-2 xl:flex-nowrap lg:justify-start'>
        {gamepadState.buttons.map((button: GamepadButton, index) => (
          <Button button={button} index={index} buttonIcon={buttons[index]} key={`button-${index}`} />
        ))}
      </div>
      {gamepadState.axes.map((axis: number, index) => (
        <ControllerAxes key={`axes-${index}`} label={getAxesLabels(index)} axis={axis} />
      ))}
    </div>
  )
};

const getControllerId = (gamepadState: GamepadState): ReactNode => {
  if (!gamepadState) {
    return null
  }
  /* eslint-disable-next-line */
  return <span className="flex items-center"><img src={getControllerIcon(gamepadState.id)} />{gamepadState.id.split('(')[0]}</span>
}

const GamepadButtons = () => {
  const [gamepadState, setGamepadState] = useState<Gamepad | null | undefined>(null);
  const requestRef = useRef();

  const handleGamepad = () => {
    // Check if the browser supports the Gamepad API
    if (!navigator.getGamepads) {
      console.error('Gamepad API not supported, please use a different browser.');
      return;
    }

    // Get the first gamepad (you can modify this logic based on your requirements)
    const gamepad = navigator.getGamepads()[0];
    // Update the state with the gamepad data
    setGamepadState(gamepad);

    requestAnimationFrame(handleGamepad);
  };

  useEffect(() => {
    // Add an event listener for the gamepadconnected event
    window.addEventListener('gamepadconnected', handleGamepad);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('gamepadconnected', handleGamepad);
      // Cancel the requestAnimationFrame when the component is unmounted
      cancelAnimationFrame(requestRef.current ?? 0);
    };
  }, []);


  return (
    <div className='p-10 text-white'>
      <h2>Gamepad connected: {getControllerId(gamepadState)}</h2>
      {renderButtons(gamepadState)}
    </div>
  );
};

export default GamepadButtons;
