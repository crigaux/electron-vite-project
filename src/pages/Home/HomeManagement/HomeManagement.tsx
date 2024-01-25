import { useState } from 'react'
import Navbar from '../../../components/organisms/Navbar'
import TopNavbar from '../../../components/organisms/TopNavbar'
import { selectedPropertyId } from '../../../features/property/propertySlice'
import { useAppSelector } from '../../../store/store'
import Agents from '../../Agents/Agents'
import Calendar from '../../Calendar/Calendar'
import Dashboard from '../../Dashboard/Dashboard'
import Messages from '../../Messages/Messages'
import Properties from '../../Properties/Properties'
import PropertyDetails from '../../PropertyDetails/PropertyDetails'

export default function HomeManagement() {
  const [tab, setTab] = useState(1)
  const selectedProperty = useAppSelector(selectedPropertyId)

  const handleAppointment = () => {
    setTab(6)
  }

  const handleContact = () => {
    setTab(7)
  }

  const handlePropertyClick = () => {
    setTab(2)
  }

  return (
    <div className='flex h-[calc(100vh-30px)] overflow-hidden'>
      <Navbar setTab={setTab} tab={tab} />
      <div className='flex flex-col'>
        <TopNavbar />

        <div className='w-[calc(100vw-280px)] min-h-[calc(100%-65px)] flex justify-center overflow-hidden'>
          {tab === 1 && (
            <div className='w-full flex justify-center'>
              <Dashboard
                handlePropertyClick={handlePropertyClick}
                handleContact={handleContact}
              />
            </div>
          )}
          {tab === 2 &&
            (selectedProperty ? <PropertyDetails /> : <Properties />)}
          {tab === 3 && (
            <Agents
              handleAppointment={handleAppointment}
              handleContact={handleContact}
            />
          )}
          {/* {tab === 4 && <div>Users</div>}
        {tab === 5 && <div>Profil</div>} */}
          {tab === 6 && <Calendar />}
          {tab === 7 && <Messages />}
          {/* {tab === 8 && <div>Profil</div>} */}
        </div>
      </div>
    </div>
  )
}
