import Link from "next/link";
import Button from "../ui/Button";
import Social, { socialIconMap } from "../ui/Social";
import AddCustomLinks from "./AddCustomLinks";
import EditSocialLinks from "./EditSocialLinks";
import type { ProfileData } from "@/app/server/getProfileData";
import { formatUrl } from "@/app/lib/utils";
import EditUserCard from "./EditUserCard";
import { getDownloadURLFromPath } from "@/app/lib/firebase";


export default async function UserCard({
  profileData,
  isOwner
}: {
  profileData?: ProfileData
  isOwner: boolean
}) {

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white/10 bg-[#121212] text-white rounded-2xl">
      <div className="size-48 ">
        <img src={await getDownloadURLFromPath(profileData?.imagePath) || "/"} alt="" className="rounded-full object-cover w-full h-full" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">{profileData?.name}</h3>
          {isOwner && <EditUserCard profileData={profileData} />}
        </div>
        <p className="opacity-40">
          {profileData?.description}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full ">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex gap-3">
          {profileData?.socialMedias &&
            Object.entries(profileData.socialMedias).map(([key, value]) => {
              if (!value) return null;

              const iconName = socialIconMap[key as keyof typeof socialIconMap];

              if (!iconName) return null;

              return (
                <Social key={key} name={iconName} isLink={true} link={value} />
              );
            })}


          {isOwner &&
            <EditSocialLinks socialMedias={profileData?.socialMedias} />
          }
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full min-h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          {profileData?.link1 && (
            <Link href={formatUrl(profileData.link1.url)} target="_blank" className="w-full">
              <Button className="w-full">{profileData.link1.title}</Button>
            </Link>
          )}
          {profileData?.link2 && (
            <Link href={formatUrl(profileData.link2.url)} target="_blank" className="w-full">
              <Button className="w-full">{profileData.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3 && (
            <Link href={formatUrl(profileData.link3.url)} target="_blank" className="w-full">
              <Button className="w-full">{profileData.link3.title}</Button>
            </Link>
          )}

          {isOwner &&
            <AddCustomLinks />
          }
        </div>
      </div>
    </div>
  );
}