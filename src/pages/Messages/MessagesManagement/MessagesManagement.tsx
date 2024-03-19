import {
  ChatContainer,
  Conversation,
  ConversationList,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RoleSerializerRead, UserSerializerRead } from '../../../api'
import {
  selectedConversationId,
  setSelectedConversationId,
} from '../../../features/messages/messageSlice'
import {
  useCreateMessageMutation,
  useLazyGetMessagesQuery,
} from '../../../features/messages/messagesApi'
import { useGetRolesQuery } from '../../../features/role/roleApi'
import { useGetUserByFilterQuery } from '../../../features/user/userApi'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { socket } from '../socket/socket'

export default function MessagesManagement() {
  const currentUser = JSON.parse(
    localStorage.getItem('user') ?? '{}',
  ) as UserSerializerRead

  const dispatch = useAppDispatch()
  const selectedAgent = useAppSelector(selectedConversationId)

  const [triggerGetMessages] = useLazyGetMessagesQuery({})
  const [createMessage] = useCreateMessageMutation({})

  const [messages, setMessages] = useState<any[]>([])
  const [active, setActive] = useState<number>(0)

  const currentAgency = JSON.parse(
    localStorage.getItem('user') as string,
  ).agency_id

  const roles = useGetRolesQuery({}).data || []
  const agentRole = roles.find(
    (role: RoleSerializerRead) => role.name === 'AGENT',
  )?.role_id

  const agents = (
    (useGetUserByFilterQuery({ role: agentRole, agency_id: currentAgency })
      .data as UserSerializerRead[]) || ([] as UserSerializerRead[])
  ).filter((agent) => agent.user_id !== currentUser.user_id)

  const selectedConversation = useMemo(
    () =>
      agents.find((agent) =>
        selectedAgent
          ? agent?.user_id === selectedAgent
          : agent?.user_id === active,
      ),
    [active, selectedAgent],
  )
  const selectedConversationImg = useMemo(() => {
    return `https://back-rently.mathieudacheux.fr/public/img/agent/${selectedConversation?.user_id}/resized-avatar.png`
  }, [selectedConversation])

  useEffect(() => {
    function addToMessages(data: any) {
      if (
        data.receiver === String(currentUser?.user_id) &&
        data.sender === String(selectedConversation?.user_id)
      ) {
        setMessages((previousMessages: any[]) => [
          ...previousMessages,
          {
            text: data.message,
            createdAt: new Date(),
            user: {
              _id: data.sender,
              name: `${currentUser?.firstname} ${currentUser?.name}`,
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }
    }

    socket.on('message', addToMessages)
    return () => {
      socket.off('message', addToMessages)
    }
  }, [active, currentUser.user_id])

  const getMessages = async () => {
    try {
      const { data } = await triggerGetMessages({
        user_id_1: currentUser.user_id,
        user_id_2: selectedConversation?.user_id,
      })

      const uniqMessage: any[] = []

      const filteredMessages = data.filter(
        (message: any) =>
          (message.user_id_1 === currentUser.user_id &&
            message.user_id_2 === selectedConversation?.user_id) ||
          (message.user_id_1 === selectedConversation?.user_id &&
            message.user_id_2 === currentUser.user_id),
      )

      filteredMessages.forEach((message: any) => {
        if (
          !uniqMessage.find((m: any) => m.message_id === message.message_id)
        ) {
          uniqMessage.push(message)
        }
      })

      if (uniqMessage?.length > 0) {
        const bufferArray = uniqMessage.map((message: any) => ({
          _id: message.message_id,
          text: message.content,
          createdAt: new Date(message.created_at),
          user: {
            _id: message.user_id_1,
            name: 'Me',
            avatar: 'https://placeimg.com/140/140/any',
          },
        }))

        const sortByDate = (a: any, b: any) => {
          return a.createdAt - b.createdAt
        }
        setMessages(bufferArray.sort(sortByDate))
      } else {
        setMessages([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMessages()
  }, [selectedConversation?.user_id])

  const onSend = useCallback(
    ({ message }: { message: string }) => {
      const newMessage = {
        text: message,
        createdAt: new Date(),
        user: {
          _id: currentUser.user_id,
          name: 'Me',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }

      setMessages((previousMessages: any) => [...previousMessages, newMessage])
      createMessage({
        content: message,
        user_id_1: currentUser.user_id,
        user_id_2: selectedConversation?.user_id,
        sender_id: currentUser.user_id,
      })
    },
    [selectedConversation?.user_id],
  )

  return (
    <div className='w-full h-full flex flex-col-reverse'>
      <MainContainer>
        <ConversationList>
          {agents.map((agent: UserSerializerRead) => (
            <Conversation
              name={
                <div className='flex items-center'>
                  <img
                    src={`https://back-rently.mathieudacheux.fr/public/img/agent/${agent?.user_id}/resized-avatar.png`}
                    alt=''
                    className='w-8 h-8 rounded-full object-cover mr-2'
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null
                      currentTarget.src =
                        'https://back-rently.mathieudacheux.fr/public/img/agent/none/avatar.png'
                    }}
                  />
                  {` ${agent?.firstname ?? ''} ${agent?.name ?? ''}`}
                </div>
              }
              active={active === agent.user_id}
              onClick={() => {
                dispatch(
                  setSelectedConversationId({
                    selectedConversationId: null,
                  }),
                )
                setActive(agent.user_id as number)
              }}
              key={agent.user_id}
            />
          ))}
        </ConversationList>
        <ChatContainer>
          <MessageList className='flex flex-col-reverse mb-2'>
            {messages?.length > 0
              ? messages?.map((message: any, index: number) => (
                  <>
                    {index > 0 &&
                    new Date(message?.createdAt) >
                      new Date(messages[index - 1]?.createdAt) &&
                    new Date(message?.createdAt).getDay() !==
                      new Date(messages[index - 1]?.createdAt).getDay() ? (
                      <div className='flex justify-center items-center'>
                        <div className='w-1/3 border-t-[1px] h-[2px] border-neutral-200' />
                        <div className='text-xs text-gray-500 w-1/3 h-[50px] flex justify-center items-center'>
                          {new Date(message?.createdAt).toLocaleString(
                            'fr-FR',
                            {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </div>
                        <div className='w-1/3 border-t-[1px] h-[2px] border-neutral-200' />
                      </div>
                    ) : null}
                    <div
                      className='flex justify-center items-center'
                      key={`${message._id} ${message.createdAt}`}
                    >
                      {(message?.user?._id !== currentUser.user_id &&
                        index > 0 &&
                        new Date(message?.createdAt) >
                          new Date(messages[index - 1]?.createdAt) &&
                        new Date(message?.createdAt).getMinutes() !==
                          new Date(
                            messages[index - 1]?.createdAt,
                          ).getMinutes()) ||
                      (message?.user?._id !== currentUser.user_id &&
                        index === 0) ? (
                        <img
                          alt='Profile'
                          className='w-8 h-8 rounded-full object-cover mr-3'
                          src={selectedConversationImg}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null
                            currentTarget.src =
                              'https://back-rently.mathieudacheux.fr/public/img/agent/none/avatar.png'
                          }}
                        />
                      ) : (
                        <div className='w-8 h-8 mr-3' />
                      )}
                      <Message
                        model={{
                          message: message.text,
                          sentTime: message.createdAt,
                          sender: currentUser?.name ?? '',
                          direction:
                            message?.user?._id !== currentUser.user_id
                              ? 'incoming'
                              : 'outgoing',
                          position: 'single',
                        }}
                      />
                    </div>
                  </>
                ))
              : null}
          </MessageList>
          <MessageInput
            placeholder='Type message here'
            onSend={(message) => onSend({ message })}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}
