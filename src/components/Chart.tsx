import React, { useEffect, useRef, useMemo } from 'react'
import * as d3 from 'd3'
import { ChartProps } from 'interfaces'

const Chart: React.FC<ChartProps> = ({ series }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  const dimensions = useMemo(
    () => ({
      width: 800,
      height: 600,
      margin: { top: 20, right: 50, bottom: 50, left: 60 },
    }),
    []
  )

  const { width, height, margin } = dimensions

  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, series[0].data.length - 1])
        .range([margin.left, width - margin.right]),
    [series, margin.left, width, margin.right]
  )

  const findMaxValue = useMemo(() => {
    return series.reduce((max, item) => {
      const itemMax = Math.max(...item.data)
      return itemMax > max ? itemMax : max
    }, 0)
  }, [series])

  const yGlobalScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, findMaxValue])
        .nice()
        .range([height - margin.bottom, margin.top]),
    [height, margin.bottom, margin.top, findMaxValue]
  )

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Очистка перед рендером
    svg.selectAll('*').remove()

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))

    // Подпись для глобальной оси X
    svg
      .append('text')
      .attr('text-anchor', 'right')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .text('Время')
      .attr('fill', '#fff')
      .style('font-size', '12px')

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yGlobalScale))

    // Подпись для глобальной оси Y
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', 15)
      .text('Глобальные значения')
      .attr('fill', '#fff')
      .style('font-size', '12px')

    // Группы для серий данных
    const linesGroup = svg.append('g')

    series.forEach((item) => {
      if (item.visible) {
        const yScale = item.individualAxis
          ? d3
              .scaleLinear()
              .domain([0, d3.max(item.data)!])
              .nice()
              .range([height - margin.bottom, margin.top])
          : yGlobalScale

        const line = d3
          .line<number>()
          .x((_, i) => xScale(i))
          .y((d) => yScale(d))
          .curve(d3.curveMonotoneX)

        if (item.individualAxis) {
          svg
            .append('g')
            .attr('transform', `translate(${width - margin.right},0)`)
            .call(
              d3
                .axisRight(yScale)
                .ticks(5)
                .tickFormat((d) => (d === 0 ? '' : d.toString()))
            )
            .attr('stroke', item.color)

          // Подпись для индивидуальной оси Y сбоку
          svg
            .append('text')
            .attr('text-anchor', 'end')
            .attr(
              'transform',
              `translate(${width - margin.right - 50}, ${margin.top + 20})`
            )
            .attr('fill', item.color)
            .text(item.name)
            .style('font-size', '12px')
        }

        // Линии данных
        linesGroup
          .append('path')
          .datum(item.data)
          .attr('fill', 'none')
          .attr('stroke', item.color)
          .attr('stroke-width', 1.5)
          .attr('d', line)
      }
    })
  }, [series, height, margin, width, xScale, yGlobalScale])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="border border-gray-700 max-w-[800px]"
    />
  )
}

export default Chart
