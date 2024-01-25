import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import {
  AppointmentSerializerRead,
  AppointmentTagSerializerRead,
} from '../../../api'
import { useGetAppointmentsQuery } from '../../../features/appointment/appointmentApi'
import { useGetAppointmentTagsQuery } from '../../../features/appointmentTag/appointmentTagApi'

export default function CalendarManagement() {
  const appointments = useGetAppointmentsQuery({}).data || []

  const tags = useGetAppointmentTagsQuery({}).data || []

  const formatDateForBackend = (date: string) => {
    const DateAndTime = date.split(' ')
    const formatedDate = DateAndTime[0].split('-')
    return `${formatedDate[2].replace(',', '')}-${formatedDate[1]}-${
      formatedDate[0]
    }T${DateAndTime[1]}`
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-11/12 h-5/6'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridWeek'
          height='100%'
          timeZone='UTC'
          locale={'fr'}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            meridiem: false,
          }}
          events={appointments.map(
            (appointment: AppointmentSerializerRead) => ({
              title: tags.find(
                (tag: AppointmentTagSerializerRead) =>
                  tag.appointment_tag_id === appointment.tag_id,
              )?.label,
              start: formatDateForBackend(
                `${new Date(
                  Date.parse(appointment.date_start || ''),
                ).toLocaleDateString('es-CL')} ${new Date(
                  Date.parse(appointment.date_start || ''),
                ).toLocaleTimeString('es-CL')}`,
              ),
            }),
          )}
        />
      </div>
    </div>
  )
}
