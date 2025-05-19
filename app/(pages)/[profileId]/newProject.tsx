"use client"

import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import TextArea from "@/app/components/ui/TextArea";
import TextInput from "@/app/components/ui/TextInput";
import { compressedFiles, handleImageInput, triggerImageInput } from "@/app/lib/utils";
import { ArrowUpFromLine, Plus } from "lucide-react";
import { startTransition, useState, type ChangeEvent } from "react";
import createProject from "../actions/createProject";
import { useRouter } from "next/navigation";

export default function NewProject({ profileId }: { profileId: string }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [projectImage, setProjectImage] = useState<string | null>(null)
  const [isCreatingProject, setIsCreatingProject] = useState(false)


  function handleOpenModal(): void {
    setIsOpen(true)
  }





  async function handleSaveProject() {
    setIsCreatingProject(true)

    const imageInput = document.getElementById("imageInput") as HTMLInputElement
    if (!imageInput.files) return

    const compressedFile = await compressedFiles(Array.from(imageInput.files))

    const formData = new FormData()
    formData.append("file", compressedFile[0])
    formData.append("profileId", profileId)
    formData.append("projectName", projectName)
    formData.append("projectDescription", projectDescription)
    formData.append("projectUrl", projectUrl)
    await createProject(formData)

    startTransition(() => {
      setIsOpen(false)
      setIsCreatingProject(false)
      setProjectName("")
      setProjectDescription("")
      setProjectUrl("")
      setProjectImage(null)
      router.refresh()
    })

  }

  return (
    <>
      <button onClick={handleOpenModal} className="cursor-pointer w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border border-dashed border-border-secondary">
        <Plus className="size-10 text-accent-green" />
        <span className="">Novo Projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Novo Projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {
                  projectImage ? (
                    <img src={projectImage} alt="Project Image" className="object-center object-cover" />
                  ) : (
                    <button className="w-full h-full cursor-pointer" onClick={() => triggerImageInput("imageInput")}>100x100</button>
                  )
                }
              </div>
              <button className="cursor-pointer text-white flex items-center" onClick={() => triggerImageInput("imageInput")}>
                <ArrowUpFromLine className="size-4" /><span>Adicionar Imagem</span></button>
              <input type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))} />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex fllex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">Título do Projeto</label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-description" className="text-white font-bold">Descrição do projeto</label>
                <TextArea id="description"
                  placeholder="Digite uma breve descrição do seu projeto"
                  className="h-36"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />

              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">URL do Projeto</label>
                <TextInput
                  type="url"
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white"
              onClick={() => setIsOpen(false)}
            >Voltar</button>
            <Button onClick={handleSaveProject} disabled={isCreatingProject}>Salvar</Button>
          </div>
        </div>
      </Modal >
    </>
  );
}