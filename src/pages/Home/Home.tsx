import { FormikProvider } from 'formik'
import { useNavigate } from 'react-router-dom'
import useHomeFormik from './hooks/useHomeFormik.ts'
import { APP_ROUTES } from '../../routes/routes.ts'
import TopBarDraggable from '../../components/atoms/TopBarDraggable.tsx'
import HomeManagement from './HomeManagement/HomeManagement.tsx'

export default function Home(): JSX.Element {
  const navigate = useNavigate()
  const { homeFormik } = useHomeFormik()

  const token = localStorage.getItem('token')

  if (!token) {
    navigate(APP_ROUTES.LOGIN)
  }

  return (
    <FormikProvider value={homeFormik}>
      <TopBarDraggable />
      <HomeManagement />
    </FormikProvider>
  )
}
