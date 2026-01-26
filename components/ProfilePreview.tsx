import type { FC } from "react";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { SocialLink } from "@/types/global";
import { ProfileProps } from "@/types/global";

interface ProfilePreviewProps {
  profile: ProfileProps;
  socials: SocialLink[];
}

const ProfilePreview: FC<ProfilePreviewProps> = ({ profile, socials }) => {
  return (
    <div className="w-full max-w-sm transform rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-2xl transition-transform duration-300 hover:scale-105">
      {/* Profile Image */}
      <div className="relative mx-auto -mt-24 h-36 w-36">
        {profile.imageUrl ? (
          <Image
            src={profile.imageUrl}
            alt="Profile Preview"
            className="h-full w-full rounded-full border-4 border-gray-700 object-cover shadow-lg"
            width={144}
            height={144}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-gray-600 bg-gray-700">
            <UserIcon className="h-20 w-20 text-gray-500" />
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="mt-6 text-center">
        <h2 className="truncate text-3xl font-bold text-white">
          {profile.firstName || "Your"} {profile.lastName || "Name"}
        </h2>
        {profile.email && (
          <p className="mt-2 text-sm text-gray-300">
            <a
              href={`mailto:${profile.email}`}
              className="text-cyan-400 hover:underline break-all"
            >
              {profile.email}
            </a>
          </p>
        )}
        <p className="mt-4 h-16 overflow-hidden text-sm text-gray-400 line-clamp-3">
          {profile.description ||
            "A short and catchy description about yourself will appear here."}
        </p>
      </div>

      {/* Social Links Preview */}
      <div className="mt-8 flex items-center justify-center gap-6">
        {socials.map(
          ({ platform, url, Icon }) =>
            url && (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-cyan-400"
              >
                <Icon className="h-7 w-7" />
              </a>
            ),
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;
