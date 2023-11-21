import Button from '../../components/atoms/Button.tsx'

export default function Agents(): JSX.Element {
  return (
    <div className='flex flex-col items-center w-full h-full mt-4'>
      <div className='flex w-11/12 h-[150px] justify-between'>
        <div className='w-3/12 bg-neutral-500'>Image</div>
        <div className='flex flex-col justify-center w-6/12'>
          <div className='text-primary font-bold text-xl'>Nom Prénom</div>
          <div>Ancienneté : 2 ans</div>
          <div>CA : 12 000€</div>
        </div>
        <div className='flex items-center'>
          <Button text='bouton' />
          <Button text='bouton' />
        </div>
      </div>
    </div>
  )
}
