export function ExpenseSelect({ id, label, value, onChange, options }) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
          {label}
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select Category</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }