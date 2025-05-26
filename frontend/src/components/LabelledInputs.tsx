
interface LabelledInputsTypes {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}



export const LabelledInputs<LabelledInputsTypes>= (label,placeholder,onChange,type) => {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 pt-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id="first_name"
        type={type || "text"}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
