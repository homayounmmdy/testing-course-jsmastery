import type { ElementType } from "react";

export interface ProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  imageUrl: string | null;
}

export interface SocialLink {
  platform: string;
  url: string;
  Icon: ElementType;
}
