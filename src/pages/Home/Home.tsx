import { useState } from 'react'
import { FormikProvider } from 'formik'
import { useNavigate } from 'react-router-dom'
import useHomeFormik from './hooks/useHomeFormik.ts'
import Navbar from '../../components/organisms/Navbar.tsx'
import Agents from '../Agents/Agents.tsx'
import { APP_ROUTES } from '../../routes/routes.ts'
import Properties from '../Properties/Properties.tsx'
import PropertyDetails from '../PropertyDetails/PropertyDetails.tsx'
import { useAppSelector } from '../../store/store.ts'
import { selectedPropertyId } from '../../features/property/propertySlice.ts'

export default function Home(): JSX.Element {
  const navigate = useNavigate()
  const { homeFormik } = useHomeFormik()

  const [tab, setTab] = useState(1)

  const token = localStorage.getItem('token')

  if (!token) {
    navigate(APP_ROUTES.LOGIN)
  }

  const selectedProperty = useAppSelector(selectedPropertyId)

  return (
    <FormikProvider value={homeFormik}>
      <div className='flex h-[100vh] overflow-hidden pt-10'>
        <Navbar setTab={setTab} tab={tab} />
        <div className='w-[calc(100vw-280px)] h-full flex justify-center overflow-hidden mt-8'>
          {tab === 1 && <div>Dashboard</div>}
          {tab === 2 &&
            (selectedProperty ? <PropertyDetails /> : <Properties />)}
          {tab === 3 && <Agents />}
          {tab === 4 && <div>Users</div>}
          {tab === 5 && <div>Profil</div>}
          {tab === 6 && <div>Profil</div>}
          {tab === 7 && <div>Profil</div>}
          {tab === 8 && <div>Profil</div>}
        </div>
      </div>
    </FormikProvider>
  )
}
