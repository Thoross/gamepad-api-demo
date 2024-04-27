import Button from './Button'
import { getControllerProfile } from './controller-profiles/controller-profile'
import ControllerAxes from './ControllerAxes'
import RadialPosition from './RadialPosition'

export interface ButtonsProps {
  gamepadState: Gamepad
}

const getAxesLabels = (index: number) => {
  switch (index) {
    case 0:
      return 'Left Stick X'
    case 1:
      return 'Left Stick Y'
    case 2:
      return 'Right Stick X'
    case 3:
      return 'Right Stick Y'
    default:
      return 'Unknown'
  }
}

const Buttons = ({ gamepadState }: ButtonsProps) => {
  const buttons = getControllerProfile(gamepadState.id)
  return (
    <div className="text-white">
      <h2 className="pb-4">Buttons</h2>
      <div className="buttons flex flex-wrap justify-between gap-2 lg:justify-start xl:flex-nowrap">
        {gamepadState.buttons.map((button: GamepadButton, index) => (
          <Button
            button={button}
            index={index}
            buttonIcon={buttons[index]}
            key={`button-${index}`}
          />
        ))}
      </div>
      <div className="py-4 md:py-6">
        {gamepadState.axes.map((axis: number, index) => (
          <ControllerAxes
            key={`axes-${index}`}
            label={getAxesLabels(index)}
            axis={axis}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap md:gap-40 md:pt-6 lg:pt-10">
        <RadialPosition
          axes={gamepadState.axes.slice(0, 2) as [number, number]}
          label="Left Stick"
          id="left"
        />
        <RadialPosition
          axes={gamepadState.axes.slice(2) as [number, number]}
          label="Right Stick"
          id="right"
        />
      </div>
    </div>
  )
}

export default Buttons
