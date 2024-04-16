import { useNavigate } from 'react-router-dom'
import Rently from '../../assets/Rently.svg'
import { APP_ROUTES } from '../../routes/routes.ts'
import Button from '../atoms/Button.tsx'
import CalendarDesk from '../atoms/icons/CalendarDesk.tsx'
import Dashboard from '../atoms/icons/Dashboard.tsx'
import Message from '../atoms/icons/Message.tsx'
import People from '../atoms/icons/People.tsx'
import Properties from '../atoms/icons/Properties.tsx'
import NavbarTitle from '../molecules/NavbarLink.tsx'
import { useAppDispatch } from '../../store/store.ts'
import { setSelectedPropertyId } from '../../features/property/propertySlice.ts'
import {
  setSelectedAgentId,
  setSelectedUserId,
} from '../../features/user/userSlice.ts'

export default function Navbar({
  tab,
  setTab,
}: {
  tab: number
  setTab: (tab: number) => void
}): JSX.Element {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const disconnectAndNavigate = () => {
    localStorage.removeItem('token')
    navigate(APP_ROUTES.LOGIN)
  }

  const resetSlices = () => {
    dispatch(setSelectedPropertyId({ selectedPropertyId: null }))
    dispatch(setSelectedUserId({ selectedUserId: null }))
    dispatch(setSelectedAgentId({ selectedAgentId: null }))
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '280px',
        backgroundColor: 'white',
      }}
      className='shadow-lg z-10'
    >
      <div className='flex items-center w-full mt-5 ml-3'>
        <img src={Rently} alt='logo' className='w-1/2' />
      </div>
      <div className='flex flex-col px-3 mt-6 h-5/6 justify-between'>
        <div className='flex flex-col gap-2 h-8/12'>
          <div
            onClick={() => {
              setTab(1)
              resetSlices()
            }}
          >
            <NavbarTitle
              title='Tableau de bord'
              isSelected={tab === 1}
              icon={Dashboard({ color: tab === 1 ? 'white' : '#808191' })}
            />
          </div>
          <div
            onClick={() => {
              setTab(2)
              resetSlices()
            }}
          >
            <NavbarTitle
              title='Propriétés'
              isSelected={tab === 2}
              icon={Properties({ color: tab === 2 ? 'white' : '#808191' })}
            />
          </div>
          <div
            onClick={() => {
              setTab(3)
              resetSlices()
            }}
          >
            <NavbarTitle
              title='Créer vente/location'
              isSelected={tab === 3}
              icon={Properties({ color: tab === 3 ? 'white' : '#808191' })}
            />
          </div>
          <div
            onClick={() => {
              setTab(4)
              resetSlices()
            }}
          >
            <NavbarTitle
              title='Agents'
              isSelected={tab === 4}
              icon={People({ color: tab === 4 ? 'white' : '#808191' })}
            />
          </div>
          <div
            onClick={() => {
              setTab(5)
              resetSlices()
            }}
          >
            <NavbarTitle
              title='Clients'
              isSelected={tab === 5}
              icon={People({ color: tab === 5 ? 'white' : '#808191' })}
            />
          </div>
          <div
            onClick={() => {
              setTab(6)
              resetSlices()
            }}
          >
            <NavbarTitle
              title='Calendrier'
              isSelected={tab === 6}
              icon={CalendarDesk({ color: tab === 6 ? 'white' : '#808191' })}
            />
          </div>
          <div
            onClick={() => {
              setTab(7)
              resetSlices()
            }}
          >
            <NavbarTitle
              title='Messages'
              isSelected={tab === 7}
              icon={Message({ color: tab === 7 ? 'white' : '#808191' })}
            />
          </div>
          {/* <div onClick={() => setTab(8)}>
            <NavbarTitle
              title='Paramètres'
              isSelected={tab === 8}
              icon={SettingDesk({ color: tab === 8 ? 'white' : '#808191' })}
            />
          </div> */}
        </div>
        <div className='h-1/6'>
          <Button
            text='Déconnexion'
            className='w-full px-3 text-center text-xl'
            rounded
            fontSize='lg'
            onClick={() => disconnectAndNavigate()}
          />
        </div>
      </div>
    </div>
  )
}
