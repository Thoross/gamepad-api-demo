export interface ButtonProps {
  buttonIcon: string | undefined
  button: GamepadButton
  index: number
}

const Button = ({ buttonIcon, button, index }: ButtonProps) => {
  return (
    <div className='button bg-black text-white data-[pressed="true"]:bg-green-600 flex flex-col justify-center items-center border rounded-md text-center' data-pressed={button.pressed || button.touched}>
      {/* eslint-disable-next-line */}
      {buttonIcon ? <img src={buttonIcon} className='w-24 h-24' /> :
        <><span>{index + 1}</span> <span>{button.pressed || button.touched ? 'pressed' : 'not pressed'}</span></>
      }
    </div>
  )
}

export default Button
