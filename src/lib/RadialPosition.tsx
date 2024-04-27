'use client'

import { useEffect, useState } from 'react'

export interface RadialPositionProps {
  axes: [number, number]
  label: string
  id: string
}

const RadialPosition = ({ label, axes, id }: RadialPositionProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const canvas = document.getElementById(`canvas-${id}`) as HTMLCanvasElement

    const context = canvas.getContext('2d')
    if (context) {
      context.fillStyle = 'black'
      context.fillRect(0, 0, canvas.width, canvas.height)
      const centerX = 100
      const centerY = 100
      const radius = 50
      const innerRadius = 10

      context.beginPath()
      context.arc(centerX, centerY, radius + innerRadius, 0, 2 * Math.PI, false)
      context.fillStyle = 'white'
      context.fill()
      context.closePath()

      context.beginPath()
      const posX = axes[0] * radius + centerX
      const posY = axes[1] * radius + centerY
      context.arc(posX, posY, innerRadius, 0, 2 * Math.PI, false)
      context.fillStyle = 'green'
      context.fill()
      context.closePath()
      setPosition({ x: posX, y: posY })
    }
  }, [axes])

  return (
    <div>
      <p className="text-center">{label}</p>
      <canvas
        id={`canvas-${id}`}
        className="aspect-square"
        width={200}
        height={200}
      />
      <p className="text-center">
        [x:{position.x.toFixed(2)}, y: {position.y.toFixed(2)}]
      </p>
    </div>
  )
}

export default RadialPosition
