import { type FC, type ChangeEventHandler, useState, ChangeEvent } from "react";
import Label from "./Label";

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  maxWords?: number;
}

export const TextArea: FC<TextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  maxWords = 50,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validate = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (maxWords && words.length > maxWords) {
      setError(`Maximum ${maxWords} words allowed`);
    } else {
      setError(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    validate(value);
    onChange(e);
  };

  const handleBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    validate(e.target.value);
  };

  return (
    <div>
      <Label htmlFor={name} label={label} />
      <textarea
        id={name}
        rows={4}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={
          placeholder ||
          "Full Stack Developer specializing in React and Node.js..."
        }
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
