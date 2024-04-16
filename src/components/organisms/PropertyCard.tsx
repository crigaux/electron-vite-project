import { useTranslation } from 'react-i18next'
import {
  PropertySerializerRead,
  StatusSerializerRead,
} from '../../api/index.ts'
import { useGetAllFolderImageQuery } from '../../features/attachment/attachmentApi.ts'
import { setSelectedPropertyId } from '../../features/property/propertySlice.ts'
import { useGetStatusQuery } from '../../features/status/statusApi.ts'
import { useAppDispatch } from '../../store/store.ts'
import CardButton from '../atoms/CardButton.tsx'
import Typography from '../atoms/Typography.tsx'
import Bath from '../atoms/icons/Bath.tsx'
import Bed from '../atoms/icons/Bed.tsx'
import Tree from '../atoms/icons/Tree.tsx'

export default function PropertyCard({
  mapOpened,
  property,
  handleClick,
}: {
  mapOpened?: boolean
  property: PropertySerializerRead
  handleClick?: () => void
}): JSX.Element {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const images =
    useGetAllFolderImageQuery({
      id: property?.property_id ? Number(property?.property_id) : 0,
    }).data ?? []

  const statuses = useGetStatusQuery({}).data || []

  return (
    <div
      id={String(property?.property_id)}
      key={String(property?.property_id)}
      className={`card ${
        !mapOpened ? 'w-[350px] min-w-[250px]' : 'flex-row w-full min-h-[220px]'
      } hover:cursor-pointer relative`}
      onClick={() => {
        dispatch(
          setSelectedPropertyId({
            selectedPropertyId: Number(property?.property_id),
          }),
        )
        handleClick?.()
      }}
    >
      {(property?.draft || property?.status_id) && (
        <div className='absolute top-[14px] right-[14px] flex gap-2 text-white'>
          {property?.draft && (
            <div className='badge badge-lg bg-orange-500 border-none'>
              Brouillon
            </div>
          )}
          {property?.status_id && (
            <div className='badge badge-lg bg-primary border-none text-white'>
              {
                statuses.find(
                  (status: StatusSerializerRead) =>
                    status.status_id === property?.status_id,
                )?.name
              }
            </div>
          )}
        </div>
      )}
      <figure className={!mapOpened ? 'w-12/12' : 'w-5/12'}>
        <img
          src={
            images?.length > 0
              ? `https://back-rently.mathieudacheux.fr/public/img/property/${property?.property_id}/${images[0]}`
              : ''
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src =
              'https://back-rently.mathieudacheux.fr/public/img/property/placeholder.png'
          }}
          alt='Album'
          className='h-full w-full object-cover rounded-xl'
        />
      </figure>
      <div
        className={`card-body ${
          !mapOpened ? 'w-12/12' : 'w-7/12'
        } flex-col justify-between`}
      >
        <div className='flex justify-between'>
          <Typography variant='h2' className='text-secondary'>
            {property?.name || ''}
          </Typography>
        </div>
        <div className='flex justify-between'>
          <Typography variant='h2' className='text-primary' price>
            {property?.price || ''}
          </Typography>
        </div>
        <div className='flex justify-between'>
          <Typography variant='text-light'>
            {`${property?.zipcode || ''} ${property?.city || ''}`}
          </Typography>
          <Typography variant='text-light' surface>
            {property?.surface || ''}
          </Typography>
        </div>
        <div className='flex justify-between'>
          <div className='flex justify-between items-center'>
            <Bed marginRight />
            <Typography variant='tiny-text' className='text-secondary'>
              {property?.bedroom && property?.bedroom > 1
                ? `${property?.bedroom} ${t('properties.bedrooms')}`
                : `${property?.bedroom} ${t('properties.bedroom')}`}
            </Typography>
          </div>
          <div className='flex justify-between items-center'>
            <Bath marginRight />
            <Typography variant='tiny-text' className='text-secondary'>
              {property?.bathroom && property?.bathroom > 1
                ? `${property?.bathroom} ${t('properties.bathrooms')}`
                : `${property?.bathroom} ${t('properties.bathroom')}`}
            </Typography>
          </div>
          {property?.land_size && (
            <div className='flex justify-between items-center'>
              <Tree marginRight />
              <Typography variant='tiny-text' className='text-secondary'>
                {`${property?.land_size} ${t('properties.landSize')}`}
              </Typography>
            </div>
          )}
        </div>
        {mapOpened ? (
          <div className='card-actions'>
            <CardButton text={t('properties.cardButton')} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
