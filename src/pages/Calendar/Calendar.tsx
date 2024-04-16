import { FormikProvider } from 'formik'
import CalendarManagement from './CalendarManagement/CalendarManagement'
import useCalendarFormik from './hooks/useCalendarFormik'

export default function Calendar() {
  const { calendarFormik } = useCalendarFormik()

  return (
    <>
      <FormikProvider value={calendarFormik}>
        <CalendarManagement />
      </FormikProvider>
    </>
  )
}
