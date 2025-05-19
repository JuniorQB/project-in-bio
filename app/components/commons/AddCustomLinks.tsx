"use client"
import { startTransition, useState } from "react";
import Modal from "../ui/Modal";
import Social from "../ui/Social";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { useParams, useRouter } from "next/navigation";
import addCustomLInks from "@/app/(pages)/actions/addCustomLInks";

export default function AddCustomLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingSocialLink, setIsSavingSocialLink] = useState(false)
  const { profileId } = useParams()


  const [link1, setLink1] = useState({
    title: "",
    url: ""
  })
  const [link2, setLink2] = useState({
    title: "",
    url: ""
  })
  const [link3, setLink3] = useState({
    title: "",
    url: ""
  })

  const router = useRouter()


  async function handleSaveCustomLinks() {
    setIsSavingSocialLink(true)
    if (!profileId) return
    await addCustomLInks({
      profileId: profileId as string,
      link1, link2, link3
    })

    startTransition(() => {
      setIsModalOpen(false)
      setIsSavingSocialLink(true)
      router.refresh()
    })


  }

  return (
    <>
      <Social name="Plus" onClick={() => setIsModalOpen(true)} />
      <Modal setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="font-bold text-white text-xl">Adiconar links personalizados</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <p className="font-bold text-white text-xl">Titulo do link</p>
                <TextInput placeholder="Digite o título"
                  value={link1.title}
                  onChange={(e) => setLink1({ ...link1, title: e.target.value })}
                />

              </div>
              <div className="flex flex-col w-full">
                <p className="font-bold text-white text-xl">Link</p>
                <TextInput placeholder="Digite a URL"
                  value={link1.url}
                  onChange={(e) => setLink1({ ...link1, url: e.target.value })}
                />

              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <p className="font-bold text-white text-xl">Titulo do link</p>
                <TextInput placeholder="Digite o título"
                  value={link2.title}
                  onChange={(e) => setLink2({ ...link1, title: e.target.value })}
                />

              </div>
              <div className="flex flex-col w-full">
                <p className="font-bold text-white text-xl">Link</p>
                <TextInput placeholder="Digite a URL"
                  value={link2.url}
                  onChange={(e) => setLink2({ ...link2, url: e.target.value })}
                />

              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <p className="font-bold text-white text-xl">Titulo do link</p>
                <TextInput placeholder="Digite o título"
                  value={link3.title}
                  onChange={(e) => setLink3({ ...link3, title: e.target.value })}
                />

              </div>
              <div className="flex flex-col w-full">
                <p className="font-bold text-white text-xl">Link</p>
                <TextInput placeholder="Digite a URL"
                  value={link3.url}
                  onChange={(e) => setLink3({ ...link3, url: e.target.value })}
                />

              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end ">
            <button onClick={() => setIsModalOpen(false)} className="text-white font-bold">Voltar</button>
            <Button onClick={handleSaveCustomLinks} disabled={isSavingSocialLink}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}