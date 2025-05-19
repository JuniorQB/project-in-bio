import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";


export const socialIconMap = {
  github: "GithubIcon",
  instagram: "Instagram",
  linkedin: "Linkedin",
  twitter: "Twitter",
} as const;


export interface SocialProps {
  name: keyof typeof Icons;
  isLink?: boolean;
  link?: string
}

export default function Social(
  {
    name,
    isLink = false,
    link,
    ...props
  }: SocialProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const Icon = Icons[name] as LucideIcon;

  if (!Icon) return null

  return (
    <>
      {!isLink ? (
        <button {...props
        } className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2e2e2e] cursor-pointer" >
          <Icon />
        </button >
      ) :
        <Link href={`${link}`} target="_blank" className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]">
          <Icon />
        </Link>
      }
    </>
  );

}