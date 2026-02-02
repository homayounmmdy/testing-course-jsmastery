import {
  type FC,
  type ChangeEventHandler,
  useState,
  FocusEventHandler,
} from "react";
import Label from "./Label";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
}

export const InputField: FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validate = (text: string) => {
    if (required && !text.trim()) {
      setError(`${label} is required.`);
    } else {
      setError(null);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    validate(value);
    onChange(e);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    validate(e.target.value);
  };
  return (
    <div>
      <Label htmlFor={name} label={label} />
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder || ""}
        required={required}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
