import type {
  FC,
  ChangeEvent,
  ChangeEventHandler,
  DragEventHandler,
} from "react";
import { useState } from "react";
import Label from "./Label";

interface ImageUploadProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const ImageUpload: FC<ImageUploadProps> = ({ handleChange }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 1) {
      setError("Only one image can be uploaded.");
      return;
    }

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const syntheticEvent = {
        target: { files: [file] },
      } as unknown as ChangeEvent<HTMLInputElement>;
      handleChange(syntheticEvent);
    }
  };

  return (
    <div>
      <Label htmlFor="profileImage" label="Profile Picture" />
      <div
          data-testid='drop-zone'
        className={`mt-2 flex items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging
            ? "bg-gray-600 border-cyan-500"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF</p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            data-testid='file-upload'
          />
        </label>
      </div>
      {error && <p data-testid='error-message' className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
