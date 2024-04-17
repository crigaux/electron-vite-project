import { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
import {
  PropertySerializerRead,
  RoleSerializerRead,
  StatusSerializerRead,
  UserSerializerRead,
} from '../../api'
import Typography from '../../components/atoms/Typography'
import Charts from '../../components/atoms/icons/Charts'
import { MONTHS } from '../../constants/constants'
import { setSelectedConversationId } from '../../features/messages/messageSlice'
import { useLazyGetPropertyByFilterQuery } from '../../features/property/propertyApi'
import { useGetRolesQuery } from '../../features/role/roleApi'
import { useGetStatusQuery } from '../../features/status/statusApi'
import { useGetUserByFilterQuery } from '../../features/user/userApi'
import { useAppDispatch } from '../../store/store'
import ContactCard from '../Agents/components/ContactCard'
import DashboardProperties from './components/DashboardProperties'
import { useGetAllAgencyFeesQuery } from '../../features/fees/feesApi'

export default function Dashboard({
  handlePropertyClick,
  handleContact,
}: {
  handlePropertyClick: () => void
  handleContact: () => void
}) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const currentAgency = JSON.parse(localStorage.getItem('user') as string)
    ?.agency_id

  const currentUser = JSON.parse(
    localStorage.getItem('user') ?? '{}',
  ) as UserSerializerRead

  const [triggerGetProperties, getPropertiesResults] =
    useLazyGetPropertyByFilterQuery({})

  const fees = useGetAllAgencyFeesQuery(currentAgency)

  useEffect(() => {
    triggerGetProperties({
      agency: currentAgency,
      withRented: true,
      withSold: true,
    })
  }, [currentAgency])

  const properties = getPropertiesResults?.data as PropertySerializerRead[]

  const statuses = useGetStatusQuery({})?.data as StatusSerializerRead[]

  const statusForSale = statuses?.find((status) => status.name === 'À vendre')
    ?.status_id
  const statusForRent = statuses?.find((status) => status.name === 'À louer')
    ?.status_id
  const statusSaled = statuses?.find((status) => status.name === 'Vendu')
    ?.status_id
  const statusRented = statuses?.find((status) => status.name === 'Loué')
    ?.status_id

  const roles = useGetRolesQuery({}).data || []
  const agentRole = roles.find(
    (role: RoleSerializerRead) => role.name === 'AGENT',
  )?.role_id

  const contacts = (
    (useGetUserByFilterQuery({ role: agentRole, agency_id: currentAgency })
      .data as UserSerializerRead[]) || ([] as UserSerializerRead[])
  ).filter((agent) => agent.user_id !== currentUser.user_id)

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: MONTHS.map((month) => t(month)),
    },
  }

  const series = [
    {
      name: 'Revenu Mensuel',
      data: fees?.data ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: '#4A43EC',
    },
  ]

  return (
    <div className='flex flex-col w-full h-full items-center overflow-scroll no-scrollbar'>
      <div className='mt-10 w-11/12 flex justify-between'>
        <div className='h-[150px] w-[280px] shadow-xl rounded-lg flex justify-around items-center'>
          <div className='flex flex-col'>
            <Typography variant='h2' className='text-neutral-900 self-start'>
              {t('dashboard.propertiesToSell')}
            </Typography>
            <div className='font-bold text-3xl mt-2 text-primary'>
              {properties?.reduce((acc, property) => {
                if (property.status_id === statusForSale) {
                  acc++
                }
                return acc
              }, 0)}
            </div>
          </div>
          <Charts />
        </div>
        <div className='h-[150px] w-[280px] shadow-xl rounded-lg flex justify-around items-center'>
          <div className='flex flex-col'>
            <Typography variant='h2' className='text-neutral-900 self-start'>
              {t('dashboard.propertiesToRent')}
            </Typography>
            <div className='font-bold text-3xl mt-2 text-primary'>
              {properties?.reduce((acc, property) => {
                if (property.status_id === statusForRent) {
                  acc++
                }
                return acc
              }, 0)}
            </div>
          </div>
          <Charts />
        </div>
        <div className='h-[150px] w-[280px] shadow-xl rounded-lg flex justify-around items-center'>
          <div className='flex flex-col'>
            <Typography variant='h2' className='text-neutral-900 self-start'>
              {t('dashboard.propertiesRented')}
            </Typography>
            <div className='font-bold text-3xl mt-2 text-primary'>
              {properties?.reduce((acc, property) => {
                if (property.status_id === statusSaled) {
                  acc++
                }
                return acc
              }, 0)}
            </div>
          </div>
          <Charts />
        </div>
        <div className='h-[150px] w-[280px] shadow-xl rounded-lg flex justify-around items-center'>
          <div className='flex flex-col'>
            <Typography variant='h2' className='text-neutral-900 self-start'>
              {t('dashboard.propertiesSold')}
            </Typography>
            <div className='font-bold text-3xl mt-2 text-primary'>
              {properties?.reduce((acc, property) => {
                if (property.status_id === statusRented) {
                  acc++
                }
                return acc
              }, 0)}
            </div>
          </div>
          <Charts />
        </div>
      </div>
      {properties?.length && (
        <div className='flex flex-col relative w-11/12 mt-10 '>
          <div className='p-2 pb-0'>
            <Typography variant='h2' className='text-neutral-900 self-start'>
              {t('dashboard.properties')}
            </Typography>
          </div>
          <DashboardProperties
            properties={properties}
            handlePropertyClick={handlePropertyClick}
          />
        </div>
      )}
      <div className='flex justify-between w-11/12'>
        <div className='w-[66%] mt-5 mb-10'>
          <div className='w-11/12 p-3'>
            <Typography variant='h2' className='text-neutral-900'>
              {t('chart.title')}
            </Typography>
          </div>
          <div className='flex flex-col h-[450px] justify-center pt-5 items-center w-full rounded-xl shadow-xl'>
            <Chart
              options={options}
              series={series}
              type='bar'
              width='900px'
              height='400px'
            />
          </div>
        </div>
        {contacts?.length && (
          <div className='w-[30%] mt-5 mb-10 pt-5'>
            <Typography variant='h2' className='text-neutral-900'>
              {t('dashboard.recentContacts')}
            </Typography>
            <div className='flex flex-col h-[450px] items-center rounded-xl shadow-xl p-3 pt-5 gap-3 overflow-y-scroll no-scrollbar'>
              {contacts?.map((contact) => (
                <ContactCard
                  contact={contact}
                  handleContact={() => {
                    handleContact()
                    dispatch(
                      setSelectedConversationId({
                        selectedConversationId: contact.user_id as number,
                      }),
                    )
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
