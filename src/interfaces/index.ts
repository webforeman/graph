export interface DataPoint {
  date: Date
  value: number
}

export interface Series {
  id: number
  name: string
  visible: boolean
  individualAxis: boolean
  data: number[]
  color: string
}

export interface ChartProps {
  series: Series[]
}

export interface StoreState {
  series: Series[]
  setSeries: (newSeries: Series[]) => void
  toggleVisibility: (id: number) => void
  toggleIndividualAxis: (id: number) => void
}

export interface CheckboxProps {
  id: string
  checked: boolean
  onChange: () => void
  label: string
}
