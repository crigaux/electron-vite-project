import { PropertySerializerRead } from '../../../api/index.ts'
import PropertyDetailsRightSide from './components/PropertyDetailsRightSide.tsx'
import PropertyDetailsLeftSide from './components/PropertyDetailsLeftSide.tsx'
import { useGetAllFolderImageQuery } from '../../../features/attachment/attachmentApi.ts'
import PropertyDetailsDesktopImages from './components/PropertyDetailsDesktopImages.tsx'
import PropertyDetailsMobileImages from './components/PropertyDetailsMobileImages.tsx'
import { useState } from 'react'
import PropertyDetailsFirstStep from './components/PropertyDetailsFirstStep.tsx'
import PropertyDetailsSecondStep from './components/PropertyDetailsSecondStep.tsx'

export default function PropertyDetailsDetailsManagement({
  property,
}: {
  property: PropertySerializerRead
}): JSX.Element {
  const images = useGetAllFolderImageQuery({
    id: Number(property?.property_id),
  }).data

  // const [selectedImage, setSelectedImage] = useState<number>(0)

  // const openModal = (selectedImage: number) => {
  //   window.image_modal.showModal()
  //   setSelectedImage(selectedImage)
  // }

  const [step, setStep] = useState<number>(1)

  return (
    property && (
      <>
        {step === 1 ? (
          <PropertyDetailsFirstStep
            setStep={setStep}
            property={property}
            images={images}
          />
        ) : (
          <PropertyDetailsSecondStep
            setStep={setStep}
            property={property}
            images={images}
          />
        )}
      </>
    )
  )
}
