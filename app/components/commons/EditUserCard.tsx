"use client"
import { ArrowUpFromLine, UserPen } from "lucide-react";
import Modal from "../ui/Modal";
import { startTransition, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import { compressedFiles, handleImageInput, triggerImageInput } from "@/app/lib/utils";
import saveProfile from "@/app/(pages)/actions/saveProfile";
import { auth } from "@/app/lib/auth";
import type { ProfileData } from "@/app/server/getProfileData";


export default function EditUserCard({ profileData }: {
  profileData?: ProfileData
}) {

  const session = auth()

  if (!session) return
  const { profileId } = useParams()
  if (!profileId) return;
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [yourName, setYourName] = useState(profileData?.name || "")
  const [yourDescription, setYourDescription] = useState(profileData?.description || "")



  const router = useRouter()
  async function handleSaveProfile() {
    setIsSaving(true)
    const imageInput = document.getElementById("profile-pic-input") as HTMLInputElement

    if (!imageInput.files) return
    const compressedImage = await compressedFiles(Array.from(imageInput.files))

    const formData = new FormData()
    formData.append("profileId", profileId as string)
    formData.append("profilePic", compressedImage[0])
    formData.append("yourName", yourName)
    formData.append("yourdescription", yourDescription)

    await saveProfile(formData)

    startTransition(() => {
      setIsModalOpen(false)
      setIsSaving(false)
      router.refresh()
    })

  }


  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        <UserPen />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>

        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Editar perfil</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {profilePic ? (
                  <img src={profilePic} alt="Profile Picture" className="object-cover object-center" />
                ) : (
                  <button className="w-full h-full" onClick={() => triggerImageInput("profile-pic-input")}>100x100</button>
                )}
              </div>
              <button className="text-white flex items-center gap-2" onClick={() => triggerImageInput("profile-pic-input")}>
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar foto</span>
              </button>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                id="profile-pic-input"
                onChange={(e) => setProfilePic(handleImageInput(e))}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="your-name" className="text-white font-bold">Seu nome</label>
                <TextInput id="your-name" placeholder="Digite seu nome"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="your-description" className="text-white font-bold">Descrição</label>
                <TextArea id="your-description" placeholder="Fale um pouco sobre você" className="h-36"
                  value={yourDescription}
                  onChange={(e) => setYourDescription(e.target.value)}
                />
              </div>
            </div>



          </div>
          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white" onClick={() => setIsModalOpen(false)}>
              Voltar
            </button>
            <Button onClick={handleSaveProfile} disabled={isSaving}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}