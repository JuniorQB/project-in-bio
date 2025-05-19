import "server-only"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"

const decodeKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64!, "base64").toString("utf-8")

//certificado
export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: decodeKey
})

//verifica se tem somente 1 instancia
if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  })
}

export const db = getFirestore()
export const storage = getStorage().bucket()


export async function getDownloadURLFromPath(imagePath: string) {
  if (!imagePath) return ""
  const file = storage.file(imagePath)

  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2500"
  })
  return url
}