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
import PropertyDetails from '../../PropertyDetails/PropertyDetails.tsx'

export default function PropertiesManagementStep() {
  const dispatch = useAppDispatch()

  const selectedProperty = useAppSelector(selectedPropertyId)

  useEffect(() => {
    dispatch(
      setSearchFilter({
        searchFilter: { name: '' },
      }),
    )
  }, [])

  const [triggerProperties, propertiesQuery] = useLazyGetPropertyByFilterQuery()

  const { values } = useFormikContext<PropertyFormikType>()

  const [properties, setProperties] = useState<PropertySerializerRead[]>([])

  useEffect(() => {
    triggerProperties({ withRented: true, withSold: true })
  }, [selectedProperty])

  useEffect(() => {
    if (propertiesQuery.data?.length > 0) {
      setProperties(propertiesQuery.data)
    } else {
      setProperties([])
    }
  }, [propertiesQuery?.data])

  const filteredProperties = useMemo(() => {
    if (values.search?.length < 3) return properties

    return properties.filter(
      (property) =>
        property?.name?.toLowerCase()?.includes(values.search?.toLowerCase()) ||
        property?.price?.toString()?.includes(values.search?.toLowerCase()),
    )
  }, [values.search, properties, propertiesQuery.data])

  const handleSearch = ({ search }: { search: string }) => {
    return properties.filter(
      (property) =>
        property?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
        property?.price?.toString()?.includes(search.toLowerCase()),
    )
  }

  return selectedProperty ? (
    <PropertyDetails />
  ) : (
    <PropertiesManagement
      properties={filteredProperties}
      search={handleSearch}
    />
  )
}
