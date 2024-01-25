import { UserSerializerRead } from '../../api'

export default function TopNavbar() {
  const currentUser = JSON.parse(
    localStorage.getItem('user') ?? '{}',
  ) as UserSerializerRead

  return (
    <div className='flex justify-end items-center min-h-[65px] pr-5 shadow-lg z-20'>
      <img
        src={`https://back-rently.mathieudacheux.fr/public/img/agent/${currentUser?.user_id}/avatar.png`}
        alt=''
        className='w-8 h-8 rounded-full object-cover object-center mr-2'
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src =
            'https://back-rently.mathieudacheux.fr/public/img/agent/none/avatar.png'
        }}
      />
      {`${currentUser?.firstname} ${currentUser?.name}`}
    </div>
  )
}
