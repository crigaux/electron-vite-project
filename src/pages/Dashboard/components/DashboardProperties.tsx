import { useRef } from 'react'
import { PropertySerializerRead } from '../../../api'
import Arrow from '../../../components/atoms/icons/Arrow'
import PropertyCard from '../../../components/organisms/PropertyCard'

export default function DashboardProperties({
  properties,
  handlePropertyClick,
}: {
  properties: PropertySerializerRead[]
  handlePropertyClick: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + 500,
        behavior: 'smooth',
      })
    }
  }

  const scrollToPrevious = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - 500,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      ref={scrollRef}
      className='flex overflow-scroll no-scrollbar overflow-y-hidden w-full gap-8 p-6 pl-1'
    >
      <div
        className='absolute left-[10px] top-[50%] z-50 cursor-pointer -translate-y-[50%]'
        onClick={() => scrollToPrevious()}
      >
        <Arrow className='rotate-90 opacity-80' bigIcons />
      </div>
      {properties?.map((property) => (
        <PropertyCard property={property} handleClick={handlePropertyClick} />
      ))}
      <div
        className='absolute right-[10px] top-[50%] cursor-pointer -translate-y-[50%]'
        onClick={() => scrollToNext()}
      >
        <Arrow className='-rotate-90 opacity-80' bigIcons />
      </div>
    </div>
  )
}
