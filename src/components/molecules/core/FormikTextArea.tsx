import { useField } from 'formik'
import { useTranslation } from 'react-i18next'

export default function FormikTextArea({
  name,
  label,
  disabled = false,
  placeholder,
  height,
}: {
  name: string
  label?: string
  disabled?: boolean
  placeholder?: string
  height?: number
}) {
  const { t } = useTranslation()
  const [field, meta] = useField(name)

  return (
    <>
      {label && (
        <label className={!disabled ? 'text-neutral-900' : 'text-neutral-500'}>
          {label}
        </label>
      )}
      <textarea
        name={field.name}
        value={field.value ? field.value.replace(/<[^>]+>/g, '') : '' || ''}
        onChange={(e) => field.onChange(e)}
        disabled={disabled}
        className='textarea min-w-full text-neutral-900 placeholder-neutral-300 '
        placeholder={placeholder ? t(placeholder) : ''}
        style={{ minHeight: height ? `${height}px` : '250px', height: 'auto' }}
      ></textarea>
      {meta.touched && meta.error ? (
        <div className='text-xs text-error'>{t(meta.error)}</div>
      ) : null}
    </>
  )
}
