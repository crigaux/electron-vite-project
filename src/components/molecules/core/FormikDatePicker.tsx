import { useField } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'

export default function FormikDatePicker({
  name,
  disabled = false,
  label,
}: Readonly<{
  name: string
  disabled?: boolean
  label?: string
}>): JSX.Element {
  const { t } = useTranslation()

  const [field, meta, helpers] = useField(name)

  return (
    <div className='w-full max-w-xs flex flex-col'>
      <label
        htmlFor={name}
        className={!disabled ? 'text-neutral-900' : 'text-neutral-500'}
      >
        {label}
      </label>
      <DatePicker
        selected={field.value}
        onChange={(date) => {
          helpers.setValue(date)
        }}
        disabled={disabled}
        timeFormat='HH:mm'
        customInput={
          <input
            className={!disabled ? 'text-neutral-900' : 'text-neutral-500'}
          />
        }
        showTimeSelect
        timeIntervals={15}
        timeCaption='time'
        dateFormat='dd/MM/yyyy HH:mm'
        className={`input input-bordered w-full max-w-xs placeholder-neutral-300 appearance-none`}
      />
      {meta.touched && meta.error ? (
        <div className='text-xs text-error'>{t(meta.error)}</div>
      ) : null}
    </div>
  )
}
