import { useTranslation } from 'react-i18next'
import { UserSerializerRead } from '../../../api'
import Calendar from '../../../components/atoms/icons/Calendar'
import Contact from '../../../components/atoms/icons/Contact'

export default function UserCard({
  user,
  handleContact,
  handleAppointment,
  onClick,
}: {
  user: UserSerializerRead
  handleContact: () => void
  handleAppointment: () => void
  onClick: () => void
}) {
  const { t } = useTranslation()

  return (
    <div
      className='card flex flex-row w-full h-[220px] justify-between cursor-pointer'
      key={user.user_id}
      onClick={onClick}
    >
      <div className='w-1/5 h-full bg-neutral-500 rounded-[20px]'>
        <img
          src={
            'https://back-rently.mathieudacheux.fr/public/img/agent/none/avatar.png'
          }
          alt='user'
          className='object-cover w-full h-full object-top rounded-[20px]'
        />
      </div>
      <div className='flex flex-col h-full justify-around w-6/12'>
        <div className='text-primary font-bold text-2xl'>
          {user.firstname} {user.name}
        </div>
      </div>
      <div className='flex h-full items-center gap-4'>
        <div className='btn-cta btn-contact' onClick={handleContact}>
          <Contact />
          {t('propertyDetails.contact')}
        </div>
        <div className='btn-cta btn-calendar' onClick={handleAppointment}>
          <Calendar />
          {t('propertyDetails.appointment')}
        </div>
      </div>
    </div>
  )
}
