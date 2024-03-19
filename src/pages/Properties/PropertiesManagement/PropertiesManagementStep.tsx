import { useEffect, useState, useMemo } from 'react'
import { useFormikContext } from 'formik'
import { useLazyGetPropertyByFilterQuery } from '../../../features/property/propertyApi.ts'
import { PropertySerializerRead } from '../../../api/index.ts'
import PropertiesManagement from './PropertiesManagement.tsx'
import { PropertyFormikType } from '../type.ts'
import { useAppDispatch } from '../../../store/store.ts'
import { setSearchFilter } from '../../../features/property/propertySlice.ts'

export default function PropertiesManagementStep() {
  const dispatch = useAppDispatch()

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
    triggerProperties({})
  }, [])

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
    />
  )
}
