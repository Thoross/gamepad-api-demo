export interface ControllerAxesProps {
  axis: number
  label: string
}

const ControllerAxes = ({ label, axis }: ControllerAxesProps) => {
  return (
    <div>
      <span>{label}:</span> <span>{axis.toFixed(3)}</span>
      <progress className='w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-600 [&::-moz-progress-bar]:bg-green-600' value={axis + 1} max='2' />
    </div>
  )
}

export default ControllerAxes
