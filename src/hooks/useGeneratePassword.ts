export default function useGeneratePassword() {
  // const [successMessage, setSuccessMessage] = useState("");

  let charset = ''
  let newPassword = ''

  charset += '!@#$%^&*()'
  charset += '0123456789'
  charset += 'abcdefghijklmnopqrstuvwxyz'
  charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (let i = 0; i < 12; i++) {
    newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return newPassword
}
