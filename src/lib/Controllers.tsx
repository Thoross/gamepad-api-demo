import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import { getControllerIcon } from './controller-profiles/controller-profile';
import Buttons from './Buttons';

export type GamepadState = Gamepad | null | undefined

const getControllerId = (gamepadState: GamepadState): ReactNode => {
  if (!gamepadState) {
    return <p className='text-white'>No gamepad connected.</p>
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
      {gamepadState &&
        <Buttons gamepadState={gamepadState} />
      }
    </div>
  );
};

export default GamepadButtons
