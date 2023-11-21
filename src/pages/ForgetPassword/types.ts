type ForgetPasswordFormik = {
  mail: string
  passwordOne: string
  passwordTwo: string
}

type JWT = {
  user_id: number
  iat: number
  exp: number
}

export type { ForgetPasswordFormik, JWT }
