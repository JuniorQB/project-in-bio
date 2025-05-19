import "server-only"
import { db } from "../lib/firebase"
import type { LinkProps } from "../(pages)/actions/addCustomLInks";

export interface ProfileData {
  userId: string;
  name?: string;
  description?: string;
  imagePath?: string;
  totalVisits: number
  createdAt: number
  socialMedias?: {
    github: string
    instagram: string
    linkedin: string
    twitter: string
  },
  link1?: LinkProps,
  link2?: LinkProps,
  link3?: LinkProps,
  updatedAt?: number
}

export interface ProjectData {
  id: string
  userId: string
  projectName: string
  projectDescription: string
  projectUrl: string
  imagePath: string
  createdAt: number
  totalVisits?: number
}

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).get()

  return snapshot.data() as ProfileData
}

export async function getProfileProject(profileId: string) {
  const snapshot = await db.collection("projects").doc(profileId).collection("projects").get()
  return snapshot.docs.map((doc) => doc.data()) as ProjectData[];
}

