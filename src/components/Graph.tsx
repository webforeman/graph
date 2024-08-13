import React, { useCallback } from 'react'
import SettingsChart from './SettingsChart'
import Chart from './Chart'
import useStore from '../store/index'

const Graph: React.FC = () => {
  const { series, toggleVisibility, toggleIndividualAxis } = useStore(
    useCallback(
      (state) => ({
        series: state.series,
        toggleVisibility: state.toggleVisibility,
        toggleIndividualAxis: state.toggleIndividualAxis,
      }),
      []
    )
  )

  return (
    <div className="flex flex-col md:flex-row justify-between m-4 max-w-fit overflow-hidden rounded-lg border-2 border-white shadow-2xl shadow-black">
      <SettingsChart
        series={series}
        onVisibilityChange={toggleVisibility}
        onIndividualAxisChange={toggleIndividualAxis}
      />
      <div className="bg-slate-800">
        <Chart series={series} />
      </div>
    </div>
  )
}

export default Graph
