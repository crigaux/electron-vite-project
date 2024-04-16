import { createContext, useEffect, useState } from 'react'
import { useGetAgencyByIdQuery } from '../features/agency/agencyApi'

export interface UserLocationContextType {
  userLocation: number[]
  setUserLocation: (location: number[]) => void
}

const UserLocationContext = createContext<UserLocationContextType | undefined>(
  undefined,
)

function UserLocationProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const currentAgency = JSON.parse(localStorage.getItem('user') as string)
    ?.agency_id

  const agencyQuery = useGetAgencyByIdQuery(currentAgency)

  const [userLocation, setUserLocation] = useState<number[]>([
    48.866667, 2.333333,
  ])

  const setUserLocationToDefault = async (position: number[]) => {
    setUserLocation(position)
  }

  useEffect(() => {
    if (agencyQuery?.data?.latitude && agencyQuery?.data?.longitude)
      setUserLocationToDefault([
        parseFloat(agencyQuery?.data?.longitude),
        parseFloat(agencyQuery?.data?.latitude),
      ])
  }, [agencyQuery?.data?.latitude, agencyQuery?.data?.longitude])

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  )
}

export { UserLocationContext, UserLocationProvider }
