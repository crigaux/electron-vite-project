import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormikTextField from '../../../components/molecules/core/FormikTextField.tsx'
import Mail from '../../../components/atoms/icons/Mail.tsx'
import Password from '../../../components/atoms/icons/Password.tsx'
import LoginImage from '../../../assets/images/login.webp'
import Typography from '../../../components/atoms/Typography.tsx'
import CardButton from '../../../components/atoms/CardButton.tsx'
import Rently from '../../../assets/Rently.svg'

export default function LoginManagement({
  login,
}: {
  login: () => Promise<boolean>
}): JSX.Element {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className='w-full flex flex-col md:flex-row items-center md:justify-center h-[calc(100vh-30px)]'>
      <img
        className='w-1/2 object-cover hidden md:block 
        h-full
        '
        src={LoginImage}
        alt='Login'
      />
      <div className='w-10/12 md:w-1/2 flex justify-center align-middle h-full'>
        <div className='flex flex-col justify-center align-middle w-[400px]'>
          <div className='pt-4'>
            <div className='flex items-center justify-center w-full pb-5'>
              <img src={Rently} alt='logo' className='w-1/2' />
            </div>
          </div>
          <div className='pt-4'>
            <Typography variant='text' className='text-neutral-900'>
              {t('connection.mail')}
            </Typography>
          </div>
          <div className='pt-2'>
            <FormikTextField
              name='mail'
              placeholder={t('connection.mail')}
              icon={<Mail />}
            />
          </div>
          <div className='pt-6'>
            <Typography variant='text' className='text-neutral-900'>
              {t('connection.password')}
            </Typography>
          </div>
          <div className='pt-2'>
            <FormikTextField
              password={!showPassword}
              name='password'
              placeholder={t('connection.password')}
              showPassword={() => setShowPassword(!showPassword)}
              icon={<Password />}
            />
          </div>
          <div className='pt-8'>
            <CardButton onClick={() => login()} text='connection.login' />
          </div>
        </div>
      </div>
    </div>
  )
}
