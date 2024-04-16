import { useTranslation } from 'react-i18next'

export default function Button({
  text,
  icon,
  rounded,
  className = '',
  fontSize = 'sm',
  disabled = false,
  bgColor,
  bgHoverColor,
  onClick,
}: {
  text: string
  icon?: React.ReactNode
  rounded?: boolean
  className?: string
  fontSize?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  bgColor?: string
  bgHoverColor?: string
  onClick?: (e: any) => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <button
      disabled={disabled}
      className={`${rounded ? 'roundedBtn' : 'btn'} md:btn-md lg:btn-md ${
        bgColor ? bgColor : 'bg-primary'
      } ${
        bgHoverColor ? bgHoverColor : 'hover:bg-primary'
      } text-white border-0 flex justify-between items-center ${className} capitalize`}
      onClick={(e) => onClick?.(e)}
    >
      {icon && <div className='mr-2'>{icon}</div>}
      <div className={`text-${fontSize}`}>{t(text)}</div>
    </button>
  )
}
