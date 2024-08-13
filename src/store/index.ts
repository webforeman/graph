import { StoreState } from 'interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Хранилище с поддержкой localStorage
const useStore = create<StoreState>()(
  persist(
    (set) => ({
      series: [
        {
          id: 1,
          name: 'За месяц, м³',
          visible: true,
          individualAxis: false,
          data: [30, 60, 90, 120, 150, 180, 210],
          color: 'tomato',
        },
        {
          id: 2,
          name: 'За сутки, м³',
          visible: true,
          individualAxis: false,
          data: [1, 2, 3, 4, 5, 6, 7],
          color: 'red',
        },
        {
          id: 3,
          name: 'Вода, %',
          visible: true,
          individualAxis: true,
          data: [5, 10, 15, 20, 25, 30, 35],
          color: 'lightblue',
        },
        {
          id: 4,
          name: 'Глубина, м',
          visible: true,
          individualAxis: false,
          data: [2, 4, 6, 8, 10, 12, 14],
          color: 'lime',
        },
      ],
      setSeries: (newSeries) => set({ series: newSeries }),
      toggleVisibility: (id) =>
        set((state) => ({
          series: state.series.map((item) =>
            item.id === id ? { ...item, visible: !item.visible } : item
          ),
        })),
      toggleIndividualAxis: (id) =>
        set((state) => ({
          series: state.series.map((item) => ({
            ...item,
            individualAxis: item.id === id ? !item.individualAxis : false,
          })),
        })),
    }),
    {
      name: 'chart-storage', // Имя ключа в localStorage
      getStorage: () => localStorage, // Используем localStorage
    }
  )
)

export default useStore
