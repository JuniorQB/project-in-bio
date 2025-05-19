"use server"
import { auth } from "@/app/lib/auth"
import { db } from "@/app/lib/firebase"
import { Timestamp } from "firebase-admin/firestore"

interface SocialLinksProps {
  profileId: string
  github: string
  instagram: string
  linkedin: string
  twitter: string
}

export default async function createSocialLinks({ profileId, github, instagram, linkedin, twitter }: SocialLinksProps) {
  const session = await auth()
  if (!session?.user?.id) return

  try {
    await db.collection("profiles").doc(profileId).update({
      socialMedias: {
        github,
        instagram,
        linkedin,
        twitter
      },
      updatedAt: Timestamp.now().toMillis()
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}