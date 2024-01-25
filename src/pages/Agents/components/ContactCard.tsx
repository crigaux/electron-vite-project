import { UserSerializerRead } from '../../../api'

export default function ContactCard({
  contact,
  handleContact,
}: {
  contact: UserSerializerRead
  handleContact: () => void
}) {
  return (
    <div
      className='w-full h-[80px] flex items-center rounded-lg shadow-lg pl-2 p-3 cursor-pointer'
      onClick={handleContact}
    >
      <img
        src={`https://back-rently.mathieudacheux.fr/public/img/agent/${contact.user_id}/avatar.png`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src =
            'https://back-rently.mathieudacheux.fr/public/img/agent/none/avatar.png'
        }}
        alt=''
        className='w-[65px] h-[65px] rounded-lg object-contain object-center mr-4'
      />
      <div className='font-bold'>{`${contact.firstname ?? ''} ${
        contact.name ?? ''
      }`}</div>
    </div>
  )
}
