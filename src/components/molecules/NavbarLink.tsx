export default function NavbarTitle({
  title,
  isSelected,
  icon,
}: {
  title: string
  isSelected: boolean
  icon: JSX.Element
}): JSX.Element {
  return (
    <div
      className={`cursor-pointer my-1 rounded-xl h-[50px] flex pl-4 items-center ${
        isSelected
          ? 'text-white bg-gradient-to-r from-[#159dff6c] to-primary'
          : 'text-[#808191]'
      }`}
    >
      <div>{icon}</div>
      <div className='ml-5 text-lg'>{title}</div>
    </div>
  )
}
