import { DialogHTMLAttributes } from 'react'

export {}

declare global {
  interface Window {
    image_modal: DialogHTMLAttributes
    add_appointment_modal: DialogHTMLAttributes
    edit_appointment_modal: DialogHTMLAttributes
  }
}
