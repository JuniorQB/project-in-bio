"use client"

import Button from "@/app/components/ui/Button";
import TextInput from "@/app/components/ui/TextInput";
import { sanitizeLink } from "@/app/lib/utils";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { createLink } from "../actions/createLink";
import { verifyLink } from "../actions/verifyLink";
import { useRouter } from "next/navigation";


export default function CreateLinkForm() {
  const [link, setLink] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value))
    setError("")
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (link.length == 0) {
      return setError("Escolha um link primeiro")
    }

    const isLinkTaken = await verifyLink(link)

    if (isLinkTaken) return setError(" Desculpe, link já está em uso")

    const isLinkCreated = await createLink(link)

    if (!isLinkCreated) return setError("Erro ao criar link. Tente novamente")

    router.push(`/${link}`)

  }
  return (
    <>
      <form action="" onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <span className="text-white">projectinbio.com/</span>
        <TextInput
          value={link}
          onChange={handleLinkChange}
        />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div className="">
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}