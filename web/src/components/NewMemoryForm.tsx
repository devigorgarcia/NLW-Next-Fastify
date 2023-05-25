'use client'

import { MediaPicker } from '@/components/MediaPicker'
import { api } from '@/services/api'
import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export const NewMemoryForm = () => {
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const file = formData.get('coverUrl')

    let coverUrl = ''

    if (file) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', file)

      const uploadResponse = await api.post('/upload', uploadFormData)

      const { fileUrl } = uploadResponse.data

      coverUrl = fileUrl
    }

    const token = Cookie.get('token')

    await api
      .post(
        '/memories',
        {
          coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error))

    router.push('/')
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-1 flex-col items-center gap-2 lg:items-start"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        spellCheck={false}
        className="flex-12 w-full resize-none rounded border-0 bg-transparent text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiencia que você quer lembrar para sempre"
      />
      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
