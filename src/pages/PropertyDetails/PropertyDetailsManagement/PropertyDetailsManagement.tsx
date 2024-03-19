import { useEffect, useRef, useState } from 'react'
import { PropertySerializerRead } from '../../../api/index.ts'
import Button from '../../../components/atoms/Button.tsx'
import Arrow from '../../../components/atoms/icons/Arrow.tsx'
import { useLazyGetAllFolderImageQuery } from '../../../features/attachment/attachmentApi.ts'
import PropertyDetailsFirstStep from './components/PropertyDetailsFirstStep.tsx'
import PropertyDetailsSecondStep from './components/PropertyDetailsSecondStep.tsx'

export default function PropertyDetailsDetailsManagement({
  property,
}: {
  property: PropertySerializerRead
}): JSX.Element {
  const [triggerGetImages, getImagesResult] = useLazyGetAllFolderImageQuery()

  const [step, setStep] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [imagesList, setImagesList] = useState<string[]>([])

  useEffect(() => {
    triggerGetImages({
      id: Number(property?.property_id),
    })
  }, [property?.property_id])

  useEffect(() => {
    if (getImagesResult.data) {
      setImagesList(getImagesResult.data)
    }
  }, [getImagesResult])

  const openModal = () => {
    window.image_modal.showModal()
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]

    addImage({ newImage: file?.name })

    const reader = new FileReader()

    const formData = new FormData()

    reader.onloadend = () => {
      formData.append('file', file)
      fetch(
        `https://back-rently.mathieudacheux.fr/file/img/property/${property.property_id}`,
        {
          method: 'POST',
          body: formData,
        },
      )
    }

    triggerGetImages({
      id: Number(property?.property_id),
    })

    reader.readAsDataURL(file)
  }

  const addImage = ({ newImage }: { newImage: string }) => {
    setImagesList((oldImages) => [...oldImages, newImage])
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    property && (
      <>
        {step === 1 ? (
          <PropertyDetailsFirstStep
            setStep={setStep}
            property={property}
            images={imagesList}
            selectedImage={selectedImage}
            openModal={openModal}
          />
        ) : (
          <PropertyDetailsSecondStep
            setStep={setStep}
            property={property}
            images={imagesList}
            selectedImage={selectedImage}
            openModal={openModal}
          />
        )}
        <dialog
          id='image_modal'
          className='flex flex-col justify-center items-center w-full modal modal-bottom sm:modal-middle'
        >
          <form method='dialog' className='modal-box'>
            <img
              src={
                imagesList?.length
                  ? `https://back-rently.mathieudacheux.fr/public/img/property/${property?.property_id}/${imagesList[selectedImage]}`
                  : ''
              }
              alt=''
              className='w-full h-full object-cover'
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src =
                  'https://back-rently.mathieudacheux.fr/public/img/property/placeholder.png'
              }}
            />
            <button className='fixed right-5 top-5 w-[35px] h-[35px] bg-white rounded-md text-primary font-extrabold' onClick={() => {}}>
              ✕
            </button>
            <div
              className='fixed cursor-pointer -rotate-90 right-5 top-[50%] w-[35px] h-[35px] text-xl flex justify-center items-center bg-white text-black rounded-md'
              onClick={() =>
                setSelectedImage(
                  selectedImage === imagesList.length - 1
                    ? 0
                    : selectedImage + 1,
                )
              }
            >
              <Arrow />
            </div>
            <div
              className='fixed cursor-pointer rotate-90 left-5 top-[50%] w-[35px] h-[35px] text-xl flex justify-center items-center bg-white text-black rounded-md'
              onClick={() =>
                setSelectedImage(
                  selectedImage === 0
                    ? imagesList.length - 1
                    : selectedImage - 1,
                )
              }
            >
              <Arrow />
            </div>
          </form>
          <input
            ref={inputRef}
            type='file'
            onChange={handleFileChange}
            className='hidden'
            accept='.jpg,.jpeg,.png'
          />
          <div className='w-full flex justify-center items-center mt-5'>
            <Button
              text='Ajouter une image'
              onClick={() => inputRef?.current?.click()}
            />
          </div>
        </dialog>
      </>
    )
  )
}
