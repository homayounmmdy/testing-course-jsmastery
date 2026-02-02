import { FC } from "react";
import { ImageUpload } from "./input-fields/ImageUpload";
import { InputField } from "./input-fields/InputField";
import { SocialFields } from "./input-fields/SocialFields";
import { TextArea } from "./input-fields/TextArea";
import { ProfileProps, SocialLink } from "@/types/global";

export interface ProfileFormProps {
  profile: ProfileProps;
  socials: SocialLink[];
  onProfileChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSocialChange: (index: number, value: string) => void;
}

const ProfileForm: FC<ProfileFormProps> = ({
  profile,
  socials,
  onProfileChange,
  onImageChange,
  onSocialChange,
}) => {
  return (
    <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Profile Details</h1>
      <div className="space-y-6">
        {/* Name Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={onProfileChange}
            placeholder="John"
            required={true}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={onProfileChange}
            placeholder="Doe"
            required={true}
          />
        </div>
        <InputField
          label="Email Address"
          name="email"
          value={profile.email}
          onChange={onProfileChange}
          placeholder="john.doe@example.com"
          required={true}
        />

        {/* Image Upload */}
        <div>
          <ImageUpload handleChange={onImageChange} />
        </div>

        {/* Description */}
        <div>
          <TextArea
            label="Description"
            name="description"
            value={profile.description}
            onChange={onProfileChange}
            placeholder="Write about yourself..."
          />
        </div>

        {/* Social Links */}
        <div>
          <SocialFields socials={socials} onChange={onSocialChange} />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
