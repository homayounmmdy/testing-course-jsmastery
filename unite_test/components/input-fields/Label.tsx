import { FC } from "react";

interface LabelProps {
  htmlFor: string;
  label: string;
}
const Label: FC<LabelProps> = ({ htmlFor, label }) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-400 mb-2"
      >
        {label}
      </label>
    </div>
  );
};

export default Label;
