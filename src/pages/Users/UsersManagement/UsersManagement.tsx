import { useFormikContext } from 'formik'
import { useMemo } from 'react'
import { RoleSerializerRead, UserSerializerRead } from '../../../api'
import Searchbar from '../../../components/organisms/Searchbar'
import { setSelectedConversationId } from '../../../features/messages/messageSlice'
import { useGetRolesQuery } from '../../../features/role/roleApi'
import { useGetUserByFilterQuery } from '../../../features/user/userApi'
import { useAppDispatch } from '../../../store/store'
import UserCard from '../components/UserCard'
import Button from '../../../components/atoms/Button'
import { setSelectedUserId } from '../../../features/user/userSlice'

export default function UsersManagement({
  handleAppointment,
  handleContact,
}: {
  handleAppointment: () => void
  handleContact: () => void
}): JSX.Element {
  const dispatch = useAppDispatch()

  const { values } = useFormikContext<{ searchUser: string }>()

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  const roles = useGetRolesQuery({}).data || []
  const userRole = roles.find(
    (role: RoleSerializerRead) => role.name === 'USER',
  )?.role_id

  const users =
    useGetUserByFilterQuery({ role: userRole, agency_id: currentAgency })
      .data || []

  const filteredUsers = useMemo(() => {
    if (values.searchUser?.length < 3) return users

    return users.filter((user: UserSerializerRead) => {
      const fullName = `${user?.name} ${user?.firstname}`
      return fullName.toLowerCase().includes(values.searchUser.toLowerCase())
    })
  }, [values.searchUser, users])

  const handleSearch = ({ search }: { search: string }) => {
    return users.filter((user: UserSerializerRead) => {
      const fullName = `${user?.name} ${user?.firstname}`
      return fullName.toLowerCase().includes(search.toLowerCase())
    })
  }

  return (
    <div className='w-full h-[calc(100vh-150px)] pt-4'>
      <div className='flex justify-center items-center flex-wrap md:flex-nowrap h-auto w-11/12 md:h-[80px]'>
        <div className='w-full flex justify-center'>
          <Searchbar
            name='searchUser'
            onClick={() => handleSearch({ search: values.searchUser })}
          />
          <Button
            text='Ajouter'
            className='ml-5'
            onClick={() => dispatch(setSelectedUserId({ selectedUserId: -1 }))}
          />
        </div>
      </div>
      <div className='flex flex-col gap-4 items-center w-full h-full overflow-scroll no-scrollbar py-4'>
        {filteredUsers.map((user: UserSerializerRead) => (
          <div key={user.user_id} className='w-11/12'>
            <UserCard
              user={user}
              handleAppointment={handleAppointment}
              onClick={() =>
                dispatch(
                  setSelectedUserId({ selectedUserId: user.user_id as number }),
                )
              }
              handleContact={() => {
                dispatch(
                  setSelectedConversationId({
                    selectedConversationId: user.user_id as number,
                  }),
                )
                handleContact()
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
