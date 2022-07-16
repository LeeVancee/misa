export type ValidationKey = 'email' | 'phone' | 'required' | 'range'
interface RuleProp {
  type: ValidationKey
  message?: string
  min?: { message: string; length: number }
  max?: { message: string; length: number }
}
interface ResObj {
  isValid: boolean
  message: string
}
type Validation = Record<
  ValidationKey,
  (param: string, rule: Array<RuleProp>) => ResObj
>
// Record是ts中高级类型，可以理解为，定义了一系列的对象，对象的属性值为validtaionKey的值，而属性值则是第二个参数决定的，它可以是对象，联合类型，枚举，函数等等，在这个案例中，他是一个函数，
// 函数有一个参数值是字符串类型，该函数会返回一个布尔值
// 邮箱的正则
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const phoneReg =
  /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/
// 这个地方他导出的就是一个对象，属性为可以，属性值为方法体
export const Validations: Validation = {
  email(str, rule) {
    const result = { isValid: true, message: '' }
    for (let i = 0; i < rule.length; i++) {
      if (rule[i].type === 'email') {
        result.isValid = emailReg.test(str)
        result.message = rule[i].message as string
        break
      }
    }
    return result
  },
  phone(str, rule) {
    const result = { isValid: true, message: '' }
    for (let i = 0; i < rule.length; i++) {
      if (rule[i].type === 'required') {
        result.isValid = phoneReg.test(str)
        result.message = rule[i].message as string
        break
      }
    }
    return result
  },
  required(str, rule) {
    const result = { isValid: true, message: '' }
    for (let i = 0; i < rule.length; i++) {
      if (rule[i].type === 'required') {
        result.isValid = !!str.trim()
        result.message = rule[i].message as string
        break
      }
    }
    return result
  },
  range(str: string, rule) {
    const newstr = str.trim()
    const result = { isValid: true, message: '' }
    for (let i = 0; i < rule.length; i++) {
      if (rule[i].type === 'range') {
        if (rule[i]?.min) {
          const nummin = rule[i]?.min?.length as number
          if (newstr.length < nummin) {
            result.isValid = false
            result.message = rule[i]?.min?.message as string
            break
          }
        }
        if (rule[i]?.max) {
          const nummax = rule[i]?.max?.length as number
          if (newstr.length > nummax) {
            result.isValid = false
            result.message = rule[i]?.max?.message as string
            break
          }
        }
      }
    }
    return result
  }
}
