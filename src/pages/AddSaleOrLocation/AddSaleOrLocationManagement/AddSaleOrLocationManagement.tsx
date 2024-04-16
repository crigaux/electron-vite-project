import { useEffect, useState } from 'react'
import FormikSelect from '../../../components/molecules/core/FormikSelect'
import { PropertySerializerRead, UserSerializerRead } from '../../../api'
import { useFormikContext } from 'formik'
import AddSaleOrLocationFirstStep from '../components/AddSaleOrLocationFirstStep'
import AddSaleOrLocationSecondStep from '../components/AddSaleOrLocationSecondStep'
import AddSaleOrLocationThirdStep from '../components/AddSaleOrLocationThirdStep'
import { useLazyGetPropertyByIdQuery } from '../../../features/property/propertyApi'
import { AddSaleOrLocationFormikType } from '../type'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
  selectedPropertyId,
  setSelectedPropertyId,
} from '../../../features/property/propertySlice'
import FormikSwitchButton from '../../../components/molecules/core/FormikSwitchButton'

export default function AddSaleOrLocationManagement({
  properties,
  saveProperty,
}: {
  properties: PropertySerializerRead[]
  saveProperty: ({
    property,
    owner,
    tenant,
    newOwner,
  }: {
    property: PropertySerializerRead
    owner: UserSerializerRead
    tenant?: UserSerializerRead | undefined
    newOwner?: UserSerializerRead | undefined
  }) => void
}) {
  const dispatch = useAppDispatch()

  const { setFieldValue } = useFormikContext<AddSaleOrLocationFormikType>()

  const [triggerGetProperty, getPropertyQuery] = useLazyGetPropertyByIdQuery()

  const selectedProperty = useAppSelector(selectedPropertyId)

  const [step, setStep] = useState<number>(1)

  useEffect(() => {
    if (selectedProperty) {
      triggerGetProperty(selectedProperty)
    } else {
      setStep(1)
    }
  }, [selectedProperty])

  useEffect(() => {
    if (getPropertyQuery.data) {
      setFieldValue('selected_property', getPropertyQuery.data)
    }
  }, [getPropertyQuery.data])

  useEffect(() => {
    if (!selectedProperty) {
      setFieldValue('property_id', null)
    }
  }, [selectedProperty])

  return !selectedProperty ? (
    <div className='flex flex-col items-center mt-10 '>
      <div className='mb-6'>
        <FormikSwitchButton name='is_sale' textOne='Vente' textTwo='Location' />
      </div>
      <FormikSelect
        name='property_id'
        label='Choisir une propriété'
        placeholder='Maison bord de mer, Appartement en ville...'
        options={
          properties.map((property) => ({
            label: property.name ?? '',
            value: property.property_id as number,
          })) ?? []
        }
        onValueChange={(value) =>
          dispatch(
            setSelectedPropertyId({ selectedPropertyId: value as number }),
          )
        }
      />
    </div>
  ) : (
    <div className='w-full'>
      {step === 1 && <AddSaleOrLocationFirstStep setStep={setStep} />}
      {step === 2 && <AddSaleOrLocationSecondStep setStep={setStep} />}
      {step === 3 && (
        <AddSaleOrLocationThirdStep
          setStep={setStep}
          saveProperty={saveProperty}
        />
      )}
    </div>
  )
}
