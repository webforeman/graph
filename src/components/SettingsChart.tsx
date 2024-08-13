import { Series } from 'interfaces'
import React from 'react'
import Checkbox from './Checkbox'

interface SettingsChartProps {
  series: Series[]
  onVisibilityChange: (id: number) => void
  onIndividualAxisChange: (id: number) => void
}

const SettingsChart: React.FC<SettingsChartProps> = React.memo(
  ({ series, onVisibilityChange, onIndividualAxisChange }) => (
    <nav className="p-4 bg-white dark:bg-gray-700">
      <h2 className="mb-4 font-semibold text-gray-900 dark:text-white text-2xl">
        Настройки
      </h2>

      {series.map((item) => (
        <div
          key={item.id}
          className="w-full border-gray-200 rounded-t-lg dark:border-gray-600 mb-2"
        >
          <strong className="mb-1 font-semibold text-gray-900 dark:text-white block">
            {item.name}
          </strong>
          <div className="flex items-center mb-2">
            <input
              id={`checkbox-visible-${item.id}`}
              type="checkbox"
              checked={item.visible}
              onChange={() => onVisibilityChange(item.id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
            />
            <label
              htmlFor={`checkbox-visible-${item.id}`}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Видимость
            </label>
          </div>
          <Checkbox
            id={`checkbox-iaxis-${item.id}`}
            checked={item.individualAxis}
            onChange={() => onIndividualAxisChange(item.id)}
            label="Индивидуальная ось"
          />
        </div>
      ))}
    </nav>
  )
)

export default SettingsChart
