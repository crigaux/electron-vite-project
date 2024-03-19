import { UserSerializerRead } from '../../../api/index.ts'
import UserDetailsFirstStep from './components/UserDetailsFirstStep.tsx'

export default function UserDetailsDetailsManagement({
  user,
}: {
  user: UserSerializerRead
}): JSX.Element {
  return user && <UserDetailsFirstStep user={user} />
}
