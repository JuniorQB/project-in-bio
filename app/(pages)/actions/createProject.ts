"use server"

import { auth } from "@/app/lib/auth"
import { db, storage } from "@/app/lib/firebase"
import { randomUUID } from "crypto"
import { Timestamp } from "firebase-admin/firestore"


export default async function createProject(formData: FormData) {
  const session = await auth()

  if (!session) return
  const profileId = formData.get("profileId") as string
  const projectName = formData.get("projectName") as string
  const projectDescription = formData.get("projectDescription") as string
  const projectUrl = formData.get("projectUrl") as string
  const file = formData.get("file") as File

  const generatedId = randomUUID()

  const storageRef = storage.file(`projects-images/${profileId}/${generatedId}`)
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  await storageRef.save(buffer)

  const imagePath = storageRef.name

  try {
    await db.collection("projects").doc(profileId).collection("projects").doc(generatedId).set({
      userId: session?.user?.id,
      projectName,
      projectDescription,
      projectUrl,
      imagePath,
      createdAt: Timestamp.now().toMillis()
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}