import { CheckboxProps } from 'interfaces'

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}) => (
  <div className="flex items-center mb-2">
    <input
      id={`checkbox-${id}`}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
    />
    <label
      htmlFor={`checkbox-${id}`}
      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
    >
      {label}
    </label>
  </div>
)

export default Checkbox
