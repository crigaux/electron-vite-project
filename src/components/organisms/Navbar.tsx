import { useNavigate } from 'react-router-dom'
import Rently from '../../assets/Rently.svg'
import { APP_ROUTES } from '../../routes/routes.ts'
import Button from '../atoms/Button.tsx'
import CalendarDesk from '../atoms/icons/CalendarDesk.tsx'
import Dashboard from '../atoms/icons/Dashboard.tsx'
import Graph from '../atoms/icons/Graph.tsx'
import Message from '../atoms/icons/Message.tsx'
import People from '../atoms/icons/People.tsx'
import Properties from '../atoms/icons/Properties.tsx'
import SettingDesk from '../atoms/icons/SettingDesk.tsx'
import NavbarTitle from '../molecules/NavbarLink.tsx'

export default function Navbar({
  tab,
  setTab,
}: {
  tab: number
  setTab: (tab: number) => void
}): JSX.Element {
  const navigate = useNavigate()

  const disconnectAndNavigate = () => {
    localStorage.removeItem('token')
    navigate(APP_ROUTES.LOGIN)
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '280px',
        backgroundColor: 'white',
      }}
      className='mt-3'
    >
      <div className='flex items-center w-full mt-5 ml-3'>
        <img src={Rently} alt='logo' className='w-1/2' />
      </div>
      <div className='flex flex-col gap-2 ml-3 mt-6'>
        <div onClick={() => setTab(1)}>
          <NavbarTitle
            title='Tableau de bord'
            isSelected={tab === 1}
            icon={Dashboard({ color: tab === 1 ? 'white' : '#808191' })}
          />
        </div>
        <div onClick={() => setTab(2)}>
          <NavbarTitle
            title='Propriétés'
            isSelected={tab === 2}
            icon={Properties({ color: tab === 2 ? 'white' : '#808191' })}
          />
        </div>
        <div onClick={() => setTab(3)}>
          <NavbarTitle
            title='Agents'
            isSelected={tab === 3}
            icon={People({ color: tab === 3 ? 'white' : '#808191' })}
          />
        </div>
        <div onClick={() => setTab(4)}>
          <NavbarTitle
            title='Clients'
            isSelected={tab === 4}
            icon={People({ color: tab === 4 ? 'white' : '#808191' })}
          />
        </div>
        <div onClick={() => setTab(5)}>
          <NavbarTitle
            title='Statistiques'
            isSelected={tab === 5}
            icon={Graph({ color: tab === 5 ? 'white' : '#808191' })}
          />
        </div>
        <div onClick={() => setTab(6)}>
          <NavbarTitle
            title='Calendrier'
            isSelected={tab === 6}
            icon={CalendarDesk({ color: tab === 6 ? 'white' : '#808191' })}
          />
        </div>
        <div onClick={() => setTab(7)}>
          <NavbarTitle
            title='Messages'
            isSelected={tab === 7}
            icon={Message({ color: tab === 7 ? 'white' : '#808191' })}
          />
        </div>
        <div onClick={() => setTab(8)}>
          <NavbarTitle
            title='Paramètres'
            isSelected={tab === 8}
            icon={SettingDesk({ color: tab === 8 ? 'white' : '#808191' })}
          />
        </div>
        <div onClick={() => setTab(8)} className='mt-10'>
          <Button text='Déconnexion' onClick={() => disconnectAndNavigate()} />
        </div>
      </div>
    </div>
  )
}
