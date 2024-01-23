import { useState } from 'react'
import { useAppSelector } from '../../../store/store'
import { selectedPropertyId } from '../../../features/property/propertySlice'
import PropertyDetails from '../../PropertyDetails/PropertyDetails'
import Properties from '../../Properties/Properties'
import Agents from '../../Agents/Agents'
import Calendar from '../../Calendar/Calendar'
import Navbar from '../../../components/organisms/Navbar'
import Messages from '../../Messages/Messages'

export default function HomeManagement() {
  const [tab, setTab] = useState(1)
  const selectedProperty = useAppSelector(selectedPropertyId)

  return (
    <div className='flex h-[calc(100vh-30px)] overflow-hidden'>
      <Navbar setTab={setTab} tab={tab} />
      <div className='h-full w-[3px] bg-gradient-to-t from-[#159dff6c] to-primary' />

      <div className='w-[calc(100vw-280px)] h-full flex justify-center overflow-hidden'>
        {tab === 1 && <div>Dashboard</div>}
        {tab === 2 && (selectedProperty ? <PropertyDetails /> : <Properties />)}
        {tab === 3 && <Agents />}
        {tab === 4 && <div>Users</div>}
        {tab === 5 && <div>Profil</div>}
        {tab === 6 && <Calendar />}
        {tab === 7 && <Messages />}
        {tab === 8 && <div>Profil</div>}
      </div>
    </div>
  )
}
