import ProjectCard from "@/app/components/commons/ProjectCard";
import TotalVisits from "@/app/components/commons/TotalVisits";
import UserCard from "@/app/components/commons/UserCard";
import { auth } from "@/app/lib/auth";
import { getProfileData, getProfileProject } from "@/app/server/getProfileData";

import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewProject from "./newProject";
import { getDownloadURLFromPath } from "@/app/lib/firebase";

export default async function ProfilePage({ params }: { params: Promise<{ profileId: string }> }) {

  const { profileId } = await params;
  const profileData = await getProfileData(profileId)

  if (!profileData) return notFound()

  const session = await auth()
  const isOwner = profileData.userId === session?.user?.id

  const projects = await getProfileProject(profileId)

  return (
    <div className="relative h-screen flex p-20 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão trial</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-accent-green font-bold cursor-pointer">Faça o upgrade agora</button>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>
      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async (project) => {
          return <ProjectCard key={project.id}
            project={project}
            isOwner={isOwner}
            img={await getDownloadURLFromPath(project.imagePath)}
          />
        })}
        {isOwner &&
          <NewProject profileId={profileId} />
        }
      </div>
      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  );
}