"use client"
import { formatUrl } from "@/app/lib/utils";
import type { ProjectData } from "@/app/server/getProfileData";
import Link from "next/link";

export default function ProjectCard({
  project,
  isOwner,
  img
}: {
  project: ProjectData,
  isOwner: boolean,
  img: string | ""
}) {

  const projectUrl = project.projectUrl
  const formatedUrl = formatUrl(projectUrl)
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Link href={formatedUrl} target="_blank" onClick={handleClick}>
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 roudend[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden shrink-0">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="uppercase text-xs font-bold text-accent-green">
              {project.totalVisits || 0} cliques
            </span>
          )}
          <div className="flex flex-col ">
            <span className="text-white font-bold text-xl">{project.projectName}</span>
            <span className="text-content-body text-sm">{project.projectDescription}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}