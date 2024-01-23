import { STATUS_MESSAGES } from '../constants/constants'

export default function MessageCard({
  name,
  status,
  message,
}: Readonly<{
  name: string
  status: keyof typeof STATUS_MESSAGES
  message: string
}>) {
  return (
    <div
      className={`flex flex-col flex-wrap bg-blue-100 w-1/2 p-3 m-3 rounded-lg ${
        status === STATUS_MESSAGES.RECEIVED
          ? 'self-end'
          : 'self-start bg-slate-300'
      }`}
    >
      <div className='font-bold'>{name}</div>
      <div>{message}</div>
    </div>
  )
}
