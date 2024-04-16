import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import { useFormikContext } from 'formik'
import { toast } from 'sonner'
import {
  AppointmentSerializerRead,
  AppointmentTagSerializerRead,
  PropertySerializerRead,
  RoleSerializerRead,
} from '../../../api'
import {
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useLazyGetAppointmentByIdQuery,
  useLazyGetAppointmentsQuery,
  useUpdateAppointmentMutation,
} from '../../../features/appointment/appointmentApi'
import { useGetAppointmentTagsQuery } from '../../../features/appointmentTag/appointmentTagApi'
import { useGetRolesQuery } from '../../../features/role/roleApi'
import { useEffect, useState } from 'react'
import Button from '../../../components/atoms/Button'
import FormikSelect from '../../../components/molecules/core/FormikSelect'
import FormikTextArea from '../../../components/molecules/core/FormikTextArea'
import FormikDatePicker from '../../../components/molecules/core/FormikDatePicker'
import Typography from '../../../components/atoms/Typography'
import { useGetPropertiesQuery } from '../../../features/property/propertyApi'
import { CalendarFormikType } from '../type'
import useFormikValidator from '../../../hooks/useFormikValidator'

export default function CalendarManagement() {
  const formikContext = useFormikContext<CalendarFormikType>()
  const { values, resetForm, setFieldValue } = formikContext

  const formikValidator = useFormikValidator<CalendarFormikType>(formikContext)

  const currentRole = JSON.parse(localStorage.getItem('user') as string).role_id
  const userId = JSON.parse(localStorage.getItem('user') as string).user_id
  const userRoles = useGetRolesQuery({}).data || []

  const [appointments, setAppointments] = useState<AppointmentSerializerRead[]>(
    [],
  )

  const adminRole = userRoles.find(
    (role: RoleSerializerRead) => role.name === 'ADMIN',
  )?.role_id

  const isUserAdmin = currentRole === adminRole

  const [triggerGetAppointmentsQuery, getAppointmentsQueryResults] =
    useLazyGetAppointmentsQuery()
  const [triggerGetAppointementByIdQuery] = useLazyGetAppointmentByIdQuery()
  const [createAppointment] = useCreateAppointmentMutation()
  const [updateAppointment] = useUpdateAppointmentMutation()
  const [deleteAppointment] = useDeleteAppointmentMutation()

  const appointmentsTypes = useGetAppointmentTagsQuery({}).data || []

  useEffect(() => {
    triggerGetAppointmentsQuery({})
  }, [isUserAdmin])

  useEffect(() => {
    if (getAppointmentsQueryResults.data)
      setAppointments(
        isUserAdmin
          ? getAppointmentsQueryResults.data
          : getAppointmentsQueryResults.data?.filter(
              (appt: AppointmentSerializerRead) => appt.user_id_1 === userId,
            ) || [],
      )
  }, [getAppointmentsQueryResults.data])

  const tags = useGetAppointmentTagsQuery({}).data || []
  const properties = useGetPropertiesQuery({}).data || []

  const formatDateForBackend = (date: string) => {
    const DateAndTime = date.split(' ')
    const formatedDate = DateAndTime[0].split('-')
    return `${formatedDate[2].replace(',', '')}-${formatedDate[1]}-${
      formatedDate[0]
    }T${DateAndTime[1]}`
  }

  const addAppointment = async ({
    propertyId,
    tagId,
    note,
    startDate,
    endDate,
  }: {
    propertyId?: number
    tagId: number
    note: string
    startDate: string
    endDate: string
  }) => {
    if ((await formikValidator(values)) === false) return
    const result = (await createAppointment({
      ...(propertyId && { property_id: propertyId }),
      tag_id: tagId,
      date_start: `${startDate}:00`,
      date_end: `${endDate}:00`,
      note: note,
      reminder: formatDateForBackend(
        new Date(Date.now()).toLocaleString('es-CL'),
      ),
      user_id_1: userId,
      user_id_2: userId,
    })) as any

    if (result.error) {
      toast.error(result.error?.message ?? 'Une erreur est survenue')
      return
    }

    toast.success('Rendez-vous créé avec succès')
    window.add_appointment_modal.close()
    resetForm()

    triggerGetAppointmentsQuery({})
  }

  const editAppointment = async ({
    appointmentId,
    propertyId,
    tagId,
    note,
    startDate,
    endDate,
  }: {
    appointmentId?: number
    propertyId?: number
    tagId: number
    note: string
    startDate: string
    endDate: string
  }) => {
    if ((await formikValidator(values)) === false) return

    const result = (await updateAppointment({
      id: appointmentId,
      ...(propertyId && { property_id: propertyId }),
      tag_id: tagId,
      date_start: `${startDate}:00`,
      date_end: `${endDate}:00`,
      note: note,
      reminder: formatDateForBackend(
        new Date(Date.now()).toLocaleString('es-CL'),
      ),
      user_id_1: userId,
      user_id_2: userId,
    })) as any

    if (result.error) {
      toast.error(result.error?.message ?? 'Une erreur est survenue')
      return
    }

    toast.success('Rendez-vous modifié avec succès')
    window.edit_appointment_modal.close()
    resetForm()

    triggerGetAppointmentsQuery({})
  }

  const handleDeleteAppointment = async ({ id }: { id: number }) => {
    const result = (await deleteAppointment(id)) as any

    if (result.error) {
      toast.error(result.error?.message ?? 'Une erreur est survenue')
      return
    }

    toast.success('Rendez-vous supprimé avec succès')
    window.edit_appointment_modal.close()
    resetForm()

    triggerGetAppointmentsQuery({})
  }

  const openModal = () => {
    window.add_appointment_modal.showModal()
  }

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='w-full h-[90%] flex justify-center items-center'>
        <div className='w-11/12 h-5/6'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridWeek'
            eventClick={async (info) => {
              const appointmentQuery = await triggerGetAppointementByIdQuery(
                info.event?.id,
              )

              setFieldValue(
                'appointment_id',
                appointmentQuery.data?.appointment_id,
              )
              setFieldValue('tag_id', appointmentQuery.data?.tag_id)
              setFieldValue('property_id', appointmentQuery.data?.property_id)
              setFieldValue(
                'startDate',
                new Date(appointmentQuery.data?.date_start),
              )
              setFieldValue(
                'endDate',
                new Date(appointmentQuery.data?.date_end),
              )
              setFieldValue('note', appointmentQuery.data?.note)

              window.edit_appointment_modal.showModal()
            }}
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
                id: String(appointment.appointment_id ?? ''),
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
      <div>
        <Button
          text='Ajouter un rendez-vous'
          onClick={() => {
            openModal()
          }}
        />
      </div>
      <dialog
        id='add_appointment_modal'
        className='modal modal-middle h-[1200px]'
      >
        <form method='dialog' className='modal-box'>
          <div className='modal-header mt-5'>
            <Typography variant='h1' className='text-center'>
              Ajouter un rendez-vous
            </Typography>
          </div>
          <div className='pt-5 flex w-[800px] justify-between'>
            <FormikSelect
              label='Type de rendez-vous'
              name='tag_id'
              onValueChange={(value) => {
                if (
                  tags?.find(
                    (tag: AppointmentTagSerializerRead) =>
                      Number(tag.appointment_tag_id) === Number(value),
                  )?.label === 'Réunion'
                ) {
                  setFieldValue('property_id', null)
                  setFieldValue('isPropertyDisabled', true)
                } else {
                  setFieldValue('isPropertyDisabled', false)
                }
              }}
              options={appointmentsTypes.map(
                (tag: AppointmentTagSerializerRead) => ({
                  label: tag.label,
                  value: tag.appointment_tag_id,
                }),
              )}
            />
            <FormikSelect
              label='Bien'
              name='property_id'
              disabled={values?.isPropertyDisabled}
              options={properties.map((property: PropertySerializerRead) => ({
                label: property.name,
                value: property.property_id,
              }))}
            />
          </div>
          <div className='pt-5 flex w-[800px] justify-between'>
            <FormikDatePicker label='Date de début' name='startDate' />
            <FormikDatePicker label='Date de fin' name='endDate' />
          </div>
          <div className='w-[800px]'>
            <FormikTextArea name='note' placeholder='Note' label='Note' />
          </div>
          <div className='modal-action flex justify-center align-middle'>
            <Button
              text='Ajouter'
              className='mb-6'
              onClick={(e) => {
                e.preventDefault()
                addAppointment({
                  propertyId: values?.property_id,
                  tagId: values?.tag_id,
                  note: values?.note,
                  startDate: values?.startDate,
                  endDate: values?.endDate,
                })
              }}
            />
            <Button
              text='Fermer'
              className='mb-6'
              onClick={(e) => {
                e.preventDefault()
                window.add_appointment_modal.close()
                resetForm()
              }}
            />
          </div>
        </form>
      </dialog>
      <dialog
        id='edit_appointment_modal'
        className='modal modal-middle h-[1200px]'
      >
        <form method='dialog' className='modal-box'>
          <div className='modal-header mt-5 flex items-center'>
            <Typography variant='h1' className='text-center'>
              Modifier un rendez-vous
            </Typography>
            {new Date(values?.startDate) >= new Date() && (
              <Button
                text='Supprimer'
                bgColor='bg-error'
                bgHoverColor='hover:bg-red-300'
                className={`${
                  new Date(values?.startDate) >= new Date() ? 'ml-6' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleDeleteAppointment({
                    id: values?.appointment_id as number,
                  })
                }}
              />
            )}
          </div>
          <div className='pt-5 flex w-[800px] justify-between'>
            <FormikSelect
              label='Type de rendez-vous'
              name='tag_id'
              disabled={new Date(values?.startDate) < new Date()}
              onValueChange={(value) => {
                if (
                  tags?.find(
                    (tag: AppointmentTagSerializerRead) =>
                      Number(tag.appointment_tag_id) === Number(value),
                  )?.label === 'Réunion'
                ) {
                  setFieldValue('property_id', null)
                  setFieldValue('isPropertyDisabled', true)
                } else {
                  setFieldValue('isPropertyDisabled', false)
                }
              }}
              options={appointmentsTypes.map(
                (tag: AppointmentTagSerializerRead) => ({
                  label: tag.label,
                  value: tag.appointment_tag_id,
                }),
              )}
            />
            <FormikSelect
              label='Bien'
              name='property_id'
              disabled={
                values?.isPropertyDisabled ||
                new Date(values?.startDate) < new Date()
              }
              options={properties.map((property: PropertySerializerRead) => ({
                label: property.name,
                value: property.property_id,
              }))}
            />
          </div>
          <div className='pt-5 flex w-[800px] justify-between'>
            <FormikDatePicker
              disabled={new Date(values?.startDate) < new Date()}
              label='Date de début'
              name='startDate'
            />
            <FormikDatePicker
              disabled={new Date(values?.startDate) < new Date()}
              label='Date de fin'
              name='endDate'
            />
          </div>
          <div className='w-[800px]'>
            <FormikTextArea
              disabled={new Date(values?.startDate) < new Date()}
              name='note'
              placeholder='Note'
              label='Note'
            />
          </div>
          <div className='modal-action flex justify-center align-middle'>
            <Button
              text='Modifier'
              className='mb-6'
              onClick={(e) => {
                e.preventDefault()
                editAppointment({
                  appointmentId: values?.appointment_id,
                  propertyId: values?.property_id,
                  tagId: values?.tag_id,
                  note: values?.note,
                  startDate: values?.startDate,
                  endDate: values?.endDate,
                })
              }}
            />
            <Button
              text='Fermer'
              className='mb-6'
              onClick={(e) => {
                e.preventDefault()
                window.edit_appointment_modal.close()
                resetForm()
              }}
            />
          </div>
        </form>
      </dialog>
    </div>
  )
}
