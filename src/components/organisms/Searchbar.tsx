import Search from '../atoms/icons/Search.tsx'
import FormikTextField from '../molecules/core/FormikTextField.tsx'

export default function Searchbar({
  name,
  onClick,
}: {
  name: string
  onClick: () => void
}) {
  return (
    <div className='searchbar flex justify-between w-1/4 bg-white mb-3 md:mb-0'>
      <div className='flex w-11/12'>
        <FormikTextField
          name={name}
          textCenter
          disableShadows
          placeholder={'searchbar.search'}
        />
      </div>

      <div className='px-4 w-1/12 flex justify-center' onClick={onClick}>
        <Search />
      </div>
    </div>
  )
}
