"use client";

import { useState } from "react";
import {
  GitHubIcon,
  TwitterIcon,
  LinkedInIcon,
} from "@/components/input-fields/Icons";
import ProfilePreview from "@/components/ProfilePreview";
import { ProfileProps } from "@/types/global";
import ProfileForm from "@/components/ProfileForm";

export default function ProfileCreatorPage() {
  const [profile, setProfile] = useState<ProfileProps>({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@me.com",
    description: "Full Stack Developer specializing in React and Node.js...",
    imageUrl: null,
  });
  const [socials, setSocials] = useState([
    { platform: "github", url: "", Icon: GitHubIcon },
    { platform: "x", url: "", Icon: TwitterIcon },
    { platform: "linkedin", url: "", Icon: LinkedInIcon },
  ]);

  // Handler for image file selection
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile((prev) => ({
        ...prev,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSocialChange = (index: number, value: string) => {
    const newSocials = [...socials];
    newSocials[index].url = value;
    setSocials(newSocials);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl backdrop-blur-lg bg-emerald-500/10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 border border-white/20 rounded-xl overflow-hidden">
        {/* --- LEFT SIDE: INPUT FORM --- */}
        <div>
          <ProfileForm
            profile={profile}
            socials={socials}
            onProfileChange={handleChange}
            onImageChange={handleImageChange}
            onSocialChange={handleSocialChange}
          />
        </div>

        {/* --- RIGHT SIDE: LIVE PROFILE PREVIEW --- */}
        <div className="flex items-center justify-center p-4">
          <ProfilePreview profile={profile} socials={socials} />
        </div>
      </div>
    </main>
  );
}
