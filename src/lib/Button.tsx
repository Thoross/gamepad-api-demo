export interface ButtonProps {
  buttonIcon: string | undefined
  button: GamepadButton
  index: number
}

const Button = ({ buttonIcon, button, index }: ButtonProps) => {
  return (
    <div
      className='button flex flex-grow flex-col items-center justify-center rounded-md border bg-black text-center text-white data-[pressed="true"]:bg-green-600'
      data-pressed={button.pressed || button.touched}
    >
      {/* eslint-disable-next-line */}
      {buttonIcon ? (
        <img src={buttonIcon} className="h-24 w-24" />
      ) : (
        <>
          <span>{index + 1}</span>{' '}
          <span>
            {button.pressed || button.touched ? 'pressed' : 'not pressed'}
          </span>
        </>
      )}
    </div>
  )
}

export default Button
