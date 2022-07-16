export type ValidationKey = 'email' | 'phone' | 'required' | 'password'

type Validation = Record<ValidationKey, (param: string) => boolean>

const emailReg =
  /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/

const phoneReg =
  /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/
const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/

export const validation: Validation = {
  email(str) {
    return emailReg.test(str)
  },
  phone(str) {
    return phoneReg.test(str)
  },
  required(str) {
    return !!str.trim()
  },
  password(str) {
    return passwordReg.test(str)
  }
}
