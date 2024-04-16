import { UserSerializerRead } from '../../api'
import { useAppDispatch } from '../../store/store'
import { setSelectedAgentId } from '../../features/user/userSlice'

export default function TopNavbar({
  handleAgentClick,
}: {
  handleAgentClick: () => void
}) {
  const dispatch = useAppDispatch()

  const currentUser = JSON.parse(
    localStorage.getItem('user') ?? '{}',
  ) as UserSerializerRead

  const onProfileClick = () => {
    dispatch(
      setSelectedAgentId({ selectedAgentId: currentUser.user_id as number }),
    )
    handleAgentClick()
  }

  return (
    <div className='flex justify-end items-center min-h-[65px] pr-5 shadow-lg z-20'>
      <div className='flex cursor-pointer' onClick={() => onProfileClick()}>
        <img
          src={`https://back-rently.mathieudacheux.fr/public/img/agent/${currentUser?.user_id}/resized-avatar.png`}
          alt=''
          className='w-8 h-8 rounded-full object-cover mr-2'
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src =
              'https://back-rently.mathieudacheux.fr/public/img/agent/none/avatar.png'
          }}
        />
        {`${currentUser?.firstname} ${currentUser?.name}`}
      </div>
    </div>
  )
}
