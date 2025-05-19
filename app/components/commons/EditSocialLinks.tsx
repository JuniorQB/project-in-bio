"use client"

import { startTransition, useState } from "react";
import Social from "../ui/Social";
import Modal from "../ui/Modal";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { useParams } from "next/navigation";
import createSocialLinks from "@/app/(pages)/actions/createSocialLinks";
import { useRouter } from "next/navigation";
import type { ProfileData } from "@/app/server/getProfileData";



export default function EditSocialLinks({
  socialMedias
}: {
  socialMedias?: ProfileData["socialMedias"]
}) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingSocialLink, setIsSavingSocialLink] = useState(false)

  const [github, setGithub] = useState(socialMedias?.github || "")
  const [instagram, setInstagram] = useState(socialMedias?.instagram || "")
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || "")
  const [twitter, setTwitter] = useState(socialMedias?.twitter || "")

  const { profileId } = useParams()

  const router = useRouter()

  async function handleAddSocialLinks() {
    setIsSavingSocialLink(true)
    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter

    })

    startTransition(() => {
      setIsModalOpen(false)
      setIsSavingSocialLink(false)
      router.refresh()
    })
  }

  return (
    <>
      <Social name="Plus" onClick={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="font-bold text-xl text-white">Adiconar redes sociais</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <Github />
              <TextInput placeholder="Link do GitHub" value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Linkedin />
              <TextInput placeholder="Link do Instagra" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Instagram />
              <TextInput placeholder="Link do Linkdin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Twitter />
              <TextInput placeholder="Link do Twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white" onClick={() => setIsModalOpen(false)}>Voltar</button>
            <Button onClick={handleAddSocialLinks} disabled={isSavingSocialLink}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}