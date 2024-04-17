import { useEffect, useState, useMemo } from 'react'
import { useFormikContext } from 'formik'
import { useLazyGetPropertyByFilterQuery } from '../../../features/property/propertyApi.ts'
import { PropertySerializerRead } from '../../../api/index.ts'
import PropertiesManagement from './PropertiesManagement.tsx'
import { PropertyFormikType } from '../type.ts'
import { useAppDispatch, useAppSelector } from '../../../store/store.ts'
import {
  selectedPropertyId,
  setSearchFilter,
} from '../../../features/property/propertySlice.ts'

export default function PropertiesManagementStep() {
  const dispatch = useAppDispatch()

  const propertyId = useAppSelector(selectedPropertyId)
  useEffect(() => {
    dispatch(
      setSearchFilter({
        searchFilter: { name: '' },
      }),
    )
  }, [])

  const [isDraft, setIsDraft] = useState<boolean>(false)
  const [isSold, setIsSold] = useState<boolean>(false)
  const [isRented, setIsRented] = useState<boolean>(false)

  const [triggerProperties, propertiesQuery] = useLazyGetPropertyByFilterQuery()

  const { values } = useFormikContext<PropertyFormikType>()

  const [properties, setProperties] = useState<PropertySerializerRead[]>([])

  useEffect(() => {
    triggerProperties({
      ...(isDraft && { draft: isDraft }),
      ...(isRented && { withRented: isRented }),
      ...(isSold && { withSold: isSold }),
    })
  }, [propertyId, isDraft, isSold, isRented])

  useEffect(() => {
    if (propertiesQuery.data?.length) {
      setProperties(propertiesQuery.data)
    } else {
      setProperties([])
    }
  }, [propertiesQuery.data])

  const filteredProperties = useMemo(() => {
    if (values.search?.length < 3) return properties

    return properties.filter(
      (property) =>
        property?.name?.toLowerCase()?.includes(values.search?.toLowerCase()) ||
        property?.price?.toString()?.includes(values.search?.toLowerCase()),
    )
  }, [values.search, properties])

  const handleSearch = ({ search }: { search: string }) => {
    return properties.filter(
      (property) =>
        property?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
        property?.price?.toString()?.includes(search.toLowerCase()),
    )
  }

  return (
    <PropertiesManagement
      properties={filteredProperties}
      search={handleSearch}
      isDraft={isDraft}
      isSold={isSold}
      isRented={isRented}
      setIsDraft={setIsDraft}
      setIsRented={setIsRented}
      setIsSold={setIsSold}
    />
  )
}
