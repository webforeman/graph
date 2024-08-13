import { ChartProps } from 'interfaces'
import React, { useEffect, useRef } from 'react'

const CanvasChart: React.FC<ChartProps> = ({ series }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const colors = ['red', 'blue', 'green', 'orange']

    let globalMin = Infinity
    let globalMax = -Infinity

    series.forEach((serie) => {
      if (serie.visible && !serie.individualAxis) {
        globalMin = Math.min(globalMin, ...serie.data)
        globalMax = Math.max(globalMax, ...serie.data)
      }
    })

    const drawAxis = (
      min: number,
      max: number,
      offset: number,
      name: string
    ) => {
      ctx.beginPath()
      ctx.moveTo(50, offset)
      ctx.lineTo(750, offset)
      ctx.stroke()

      ctx.fillText(name, 760, offset)
      ctx.fillText(min.toString(), 50, offset + 15)
      ctx.fillText(max.toString(), 700, offset + 15)
    }

    if (globalMin !== Infinity && globalMax !== -Infinity) {
      drawAxis(globalMin, globalMax, 550, 'Global Axis')
    }

    let individualOffset = 50
    series.forEach((serie, index) => {
      if (serie.visible) {
        const min = serie.individualAxis ? Math.min(...serie.data) : globalMin
        const max = serie.individualAxis ? Math.max(...serie.data) : globalMax
        const scale = (500 - individualOffset) / (max - min)
        const color = colors[index % colors.length]

        ctx.beginPath()
        ctx.strokeStyle = color
        serie.data.forEach((value, i) => {
          const x = 50 + i * (700 / (serie.data.length - 1))
          const y = 550 - (value - min) * scale
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        ctx.stroke()

        if (serie.individualAxis) {
          drawAxis(min, max, individualOffset, serie.name)
          individualOffset += 50
        }
      }
    })
  }, [series])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-gray-400"
    />
  )
}

export default CanvasChart
