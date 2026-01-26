import { ChangeEvent, useState, useCallback, type FC } from "react";
import Label from "./Label";
import { SocialLink } from "@/types/global";

interface SocialFieldsProps {
  socials: SocialLink[];
  onChange: (index: number, value: string) => void;
}

export const SocialFields: FC<SocialFieldsProps> = ({ socials, onChange }) => {
  const [errors, setErrors] = useState<Record<number, string | null>>({});

  const validateUrl = useCallback((url: string, platform: string): boolean => {
    if (url.trim() === "") {
      return true;
    }

    // Remove protocol if present for validation
    const urlWithoutProtocol = url.replace(/^https?:\/\//, "");

    let pattern: RegExp;
    switch (platform.toLowerCase()) {
      case "x":
        pattern = /^(www\.)?(x\.com|twitter\.com)/i;
        break;
      case "linkedin":
        pattern = /^(www\.)?linkedin\.com/i;
        break;
      case "github":
        pattern = /^(www\.)?github\.com/i;
        break;
      default:
        return false;
    }

    return pattern.test(urlWithoutProtocol);
  }, []);

  const getValidationMessage = useCallback(
    (url: string, platform: string): string | null => {
      if (url.trim() === "") {
        return null;
      }

      if (!validateUrl(url, platform)) {
        const expectedDomain =
          platform.toLowerCase() === "x"
            ? "x.com or twitter.com"
            : `${platform.toLowerCase()}.com`;
        return `Please enter a valid ${platform} URL (must contain ${expectedDomain})`;
      }

      return null;
    },
    [validateUrl],
  );

  const handleSocialChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    const platform = socials[index].platform;

    onChange(index, value);

    const newErrors = { ...errors };
    newErrors[index] = getValidationMessage(value, platform);
    setErrors(newErrors);
  };

  const handleBlur = (index: number, value: string) => {
    const platform = socials[index].platform;
    const newErrors = { ...errors };

    if (value.trim() !== "" && !validateUrl(value, platform)) {
      newErrors[index] = getValidationMessage(value, platform);
    }

    setErrors(newErrors);
  };

  return (
    <div>
      <Label htmlFor="description" label="Social Links" />

      <div className="space-y-3">
        {socials.map((social, index) => (
          <div key={social.platform} className="flex items-center gap-3">
            <social.Icon className="h-6 w-6 text-gray-500" />
            <div className="w-full">
              <input
                type="url"
                value={social.url}
                onChange={(e) => handleSocialChange(index, e)}
                onBlur={(e) => handleBlur(index, e.target.value)}
                placeholder={`${
                  social.platform.toLowerCase() === "x"
                    ? "x.com/username"
                    : `${social.platform.toLowerCase()}.com/username`
                }`}
                className={`w-full bg-gray-700 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-all ${
                  errors[index]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-cyan-500"
                }`}
              />
              {errors[index] && (
                <p className="mt-1 text-sm text-red-500">{errors[index]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
