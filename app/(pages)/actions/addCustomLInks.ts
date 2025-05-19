"use server"

import { db } from "@/app/lib/firebase";


export type LinkProps = {
  title: string;
  url: string;
}

export default async function addCustomLInks({
  profileId,
  link1,
  link2,
  link3
}: {
  profileId: string;
  link1: LinkProps;
  link2: LinkProps;
  link3: LinkProps;
}) {
  try {
    await db.collection("profiles").doc(profileId).update({
      link1,
      link2,
      link3
    })
  } catch (error) {
    console.log(error)
  }
}